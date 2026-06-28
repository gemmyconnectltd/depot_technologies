import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import type { ApiResponse } from "@/lib/types";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const [
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingRfqs,
      recentOrders,
      allInventory,
    ] = await Promise.all([
      prisma.product.count({ where: { active: true } }),
      prisma.order.count(),
      prisma.payment.aggregate({
        where: { status: "PAID" },
        _sum: { amount: true },
      }),
      prisma.rFQ.count({ where: { status: "SUBMITTED" } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true, email: true } },
          items: { take: 3, include: { product: { select: { name: true } } } },
        },
      }),
      prisma.inventory.findMany({
        include: {
          product: { select: { name: true, sku: true, category: true } },
        },
        orderBy: { quantity: "asc" },
      }),
    ]);

    const lowStockItems = allInventory
      .filter((item) => item.quantity <= item.lowThreshold)
      .map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        sku: item.product.sku,
        category: item.product.category,
        quantity: item.quantity,
        threshold: item.lowThreshold,
      }));

    const data = {
      totalProducts,
      totalOrders,
      totalRevenue: Number(totalRevenue._sum.amount ?? 0),
      pendingRfqs,
      recentOrders: recentOrders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        total: Number(order.total),
        customer: order.user?.name ?? order.user?.email ?? "N/A",
        createdAt: order.createdAt.toISOString(),
        itemCount: order.items.length,
      })),
      lowStockItems,
    };

    return NextResponse.json<ApiResponse<typeof data>>(
      { data, error: null },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import type { ApiResponse } from "@/lib/types";
import type { OrderStatus } from "@/prisma/generated/client";

const ALLOWED_STATUSES: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const orders = await prisma.order.findMany({
      where: {
        ...(status && ALLOWED_STATUSES.includes(status as OrderStatus)
          ? { status: status as OrderStatus }
          : {}),
        ...(search
          ? {
              OR: [
                { orderNumber: { contains: search, mode: "insensitive" } },
                { user: { name: { contains: search, mode: "insensitive" } } },
                { user: { email: { contains: search, mode: "insensitive" } } },
              ],
            }
          : {}),
      },
      include: {
        user: { select: { name: true, email: true } },
        items: { include: { product: { select: { name: true } } } },
        payment: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const mapped = orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      subtotal: Number(order.subtotal),
      tax: Number(order.tax),
      total: Number(order.total),
      notes: order.notes,
      customer: order.user?.name ?? order.user?.email ?? "N/A",
      customerEmail: order.user?.email ?? null,
      createdAt: order.createdAt.toISOString(),
      itemCount: order.items.length,
      items: order.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice),
      })),
      payment: order.payment
        ? {
            id: order.payment.id,
            method: order.payment.method,
            status: order.payment.status,
            amount: Number(order.payment.amount),
            reference: order.payment.reference,
          }
        : null,
    }));

    return NextResponse.json<ApiResponse<typeof mapped>>(
      { data: mapped, error: null },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

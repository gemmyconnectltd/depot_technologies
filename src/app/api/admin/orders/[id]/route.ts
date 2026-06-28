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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true, phone: true } },
        organisation: { select: { name: true } },
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
              },
            },
          },
        },
        payment: true,
        address: true,
      },
    });

    if (!order) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Order not found" },
        { status: 404 }
      );
    }

    const data = {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      subtotal: Number(order.subtotal),
      tax: Number(order.tax),
      total: Number(order.total),
      notes: order.notes,
      customer: order.user?.name ?? "N/A",
      customerEmail: order.user?.email ?? null,
      customerPhone: order.user?.phone ?? null,
      organisation: order.organisation?.name ?? null,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      items: order.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.images[0]?.url ?? null,
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
            paidAt: order.payment.paidAt?.toISOString() ?? null,
          }
        : null,
      address: order.address
        ? {
            id: order.address.id,
            label: order.address.label,
            line1: order.address.line1,
            line2: order.address.line2,
            city: order.address.city,
            state: order.address.state,
            country: order.address.country,
            postalCode: order.address.postalCode,
          }
        : null,
    };

    return NextResponse.json<ApiResponse<typeof data>>(
      { data, error: null },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body as { status: string };

    if (!status || !ALLOWED_STATUSES.includes(status as OrderStatus)) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Invalid status" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!order) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Order not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status: status as OrderStatus },
    });

    return NextResponse.json(
      {
        data: {
          id: updated.id,
          orderNumber: updated.orderNumber,
          status: updated.status,
        },
        error: null,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to update order" },
      { status: 500 }
    );
  }
}

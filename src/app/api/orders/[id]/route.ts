import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import type { ApiResponse } from "@/lib/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
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

    if (!order || order.userId !== session.user.id) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: {
          id: order.id,
          orderNumber: order.orderNumber,
          status: order.status,
          subtotal: Number(order.subtotal),
          tax: Number(order.tax),
          total: Number(order.total),
          notes: order.notes,
          createdAt: order.createdAt.toISOString(),
          items: order.items.map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: Number(item.unitPrice),
            totalPrice: Number(item.totalPrice),
            product: {
              name: item.product.name,
              image: item.product.images[0]?.url ?? "",
            },
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
        },
        error: null,
      },
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
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const order = await prisma.order.findFirst({
      where: { id, userId: session.user.id },
      select: { id: true, status: true },
    });

    if (!order) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Order not found" },
        { status: 404 }
      );
    }

    if (order.status !== "PENDING") {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Only pending orders can be cancelled" },
        { status: 400 }
      );
    }

    await prisma.order.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json(
      { data: { message: "Order cancelled" }, error: null },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to cancel order" },
      { status: 500 }
    );
  }
}

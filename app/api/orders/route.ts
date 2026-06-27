import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { createOrderSchema } from "@/lib/validations";
import type { ApiResponse } from "@/lib/types";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
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
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const mapped = orders.map((order) => ({
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
    }));

    return NextResponse.json(
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

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const parsed = createOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: parsed.error.message },
        { status: 400 }
      );
    }

    const { addressId, paymentMethod, notes } = parsed.data;

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                retailPrice: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Cart is empty" },
        { status: 400 }
      );
    }

    const items = cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: Number(item.product.retailPrice),
      totalPrice: Number(item.product.retailPrice) * item.quantity,
    }));

    const subtotal = items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );
    const tax = Math.round(subtotal * 0.18 * 100) / 100;
    const total = subtotal + tax;

    const count = await prisma.order.count();
    const orderNumber = `ORD-${String(count + 1).padStart(6, "0")}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session.user.id,
        subtotal,
        tax,
        total,
        notes: notes ?? null,
        addressId,
        items: {
          create: items,
        },
        payment: {
          create: {
            method: paymentMethod,
            status: "PENDING",
            amount: total,
          },
        },
      },
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
      },
    });

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return NextResponse.json(
      {
        data: {
          id: order.id,
          orderNumber: order.orderNumber,
          status: order.status,
          subtotal: Number(order.subtotal),
          tax: Number(order.tax),
          total: Number(order.total),
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
          payment: {
            id: order.payment!.id,
            method: order.payment!.method,
            status: order.payment!.status,
            amount: Number(order.payment!.amount),
            reference: order.payment!.reference,
            paidAt: order.payment!.paidAt?.toISOString() ?? null,
          },
        },
        error: null,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to create order" },
      { status: 500 }
    );
  }
}

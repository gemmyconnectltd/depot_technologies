import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { addToCartSchema } from "@/lib/validations";
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
    const cart = await prisma.cart.findUnique({
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
      },
    });

    if (!cart) {
      return NextResponse.json(
        { data: { id: null, items: [], total: 0 }, error: null },
        { status: 200 }
      );
    }

    const items = cart.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        category: item.product.category,
        retailPrice: Number(item.product.retailPrice),
        stockStatus: item.product.stockStatus,
        image: item.product.images[0]?.url ?? "",
        imageAlt: item.product.images[0]?.alt ?? item.product.name,
      },
    }));

    const total = items.reduce(
      (sum, item) => sum + item.product.retailPrice * item.quantity,
      0
    );

    return NextResponse.json(
      { data: { id: cart.id, items, total }, error: null },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to fetch cart" },
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
    const parsed = addToCartSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: parsed.error.message },
        { status: 400 }
      );
    }

    const { productId, quantity } = parsed.data;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, stockStatus: true },
    });

    if (!product) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Product not found" },
        { status: 404 }
      );
    }

    if (product.stockStatus === "OUT_OF_STOCK") {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Product is out of stock" },
        { status: 400 }
      );
    }

    const cart = await prisma.cart.upsert({
      where: { userId: session.user.id },
      create: { userId: session.user.id },
      update: {},
    });

    const existingItem = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

    let cartItem;
    if (existingItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      });
    }

    return NextResponse.json(
      { data: cartItem, error: null },
      { status: 201 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    }

    return NextResponse.json(
      { data: { message: "Cart cleared" }, error: null },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}

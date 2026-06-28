import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { updateCartItemSchema } from "@/lib/validations";
import type { ApiResponse } from "@/lib/types";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { productId } = await params;
    const body = await req.json();
    const parsed = updateCartItemSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: parsed.error.message },
        { status: 400 }
      );
    }

    const { quantity } = parsed.data;

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    if (!cart) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Cart not found" },
        { status: 404 }
      );
    }

    if (quantity === 0) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId },
      });
      return NextResponse.json(
        { data: { message: "Item removed" }, error: null },
        { status: 200 }
      );
    }

    const updated = await prisma.cartItem.update({
      where: { cartId_productId: { cartId: cart.id, productId } },
      data: { quantity },
    });

    return NextResponse.json(
      { data: updated, error: null },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { productId } = await params;

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    if (!cart) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Cart not found" },
        { status: 404 }
      );
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    });

    return NextResponse.json(
      { data: { message: "Item removed" }, error: null },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to remove item" },
      { status: 500 }
    );
  }
}

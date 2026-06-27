import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { updateProductSchema } from "@/lib/validations";
import type { ApiResponse } from "@/lib/types";

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

    const product = await prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!product) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Product not found" },
        { status: 404 }
      );
    }

    if (body.action === "archive") {
      await prisma.product.update({
        where: { id },
        data: { active: false },
      });

      return NextResponse.json(
        { data: { message: "Product archived" }, error: null },
        { status: 200 }
      );
    }

    if (body.action === "restore") {
      await prisma.product.update({
        where: { id },
        data: { active: true },
      });

      return NextResponse.json(
        { data: { message: "Product restored" }, error: null },
        { status: 200 }
      );
    }

    const parsed = updateProductSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: parsed.error.message },
        { status: 400 }
      );
    }

    const { stockQuantity, lowThreshold, ...productData } = parsed.data;

    const updateData: Record<string, unknown> = { ...productData };

    if (productData.name) {
      updateData.slug = productData.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    }

    await prisma.product.update({
      where: { id },
      data: {
        ...updateData,
        ...(stockQuantity !== undefined || lowThreshold !== undefined
          ? {
              inventory: {
                upsert: {
                  create: {
                    quantity: stockQuantity ?? 0,
                    lowThreshold: lowThreshold ?? 10,
                  },
                  update: {
                    ...(stockQuantity !== undefined
                      ? { quantity: stockQuantity }
                      : {}),
                    ...(lowThreshold !== undefined
                      ? { lowThreshold }
                      : {}),
                  },
                },
              },
            }
          : {}),
      },
    });

    return NextResponse.json(
      { data: { message: "Product updated" }, error: null },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

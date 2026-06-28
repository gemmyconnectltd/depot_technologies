import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { createProductSchema } from "@/lib/validations";
import type { ApiResponse } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");

    const products = await prisma.product.findMany({
      where: {
        active: true,
        ...(category && { category: category as never }),
        ...(featured === "true" && { featured: true }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
      },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        inventory: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json<ApiResponse<typeof products>>(
      { data: products, error: null },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: parsed.error.message },
        { status: 400 }
      );
    }

    const { stockQuantity, lowThreshold, ...productData } =
      parsed.data;

    const slug = productData.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const product = await prisma.product.create({
      data: {
        ...productData,
        slug,
        inventory: {
          create: {
            quantity: stockQuantity,
            lowThreshold,
          },
        },
      },
    });

    return NextResponse.json<ApiResponse<typeof product>>(
      { data: product, error: null },
      { status: 201 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to create product" },
      { status: 500 }
    );
  }
}

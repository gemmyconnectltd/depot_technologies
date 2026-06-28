import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { createProductSchema } from "@/lib/validations";
import type { ApiResponse } from "@/lib/types";

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
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const includeInactive = searchParams.get("includeInactive") === "true";

    const products = await prisma.product.findMany({
      where: {
        ...(!includeInactive ? { active: true } : {}),
        ...(category
          ? { category: category as never }
          : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { sku: { contains: search, mode: "insensitive" } },
                { brand: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        inventory: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const mapped = products.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      category: product.category,
      brand: product.brand,
      retailPrice: Number(product.retailPrice),
      bulkPrice: product.bulkPrice ? Number(product.bulkPrice) : null,
      bulkMinQty: product.bulkMinQty,
      stockStatus: product.stockStatus,
      active: product.active,
      featured: product.featured,
      createdAt: product.createdAt.toISOString(),
      image: product.images[0]?.url ?? null,
      quantity: product.inventory?.quantity ?? 0,
      lowThreshold: product.inventory?.lowThreshold ?? 10,
    }));

    return NextResponse.json<ApiResponse<typeof mapped>>(
      { data: mapped, error: null },
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
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const parsed = createProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: parsed.error.message },
        { status: 400 }
      );
    }

    const { stockQuantity, lowThreshold, ...productData } = parsed.data;

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

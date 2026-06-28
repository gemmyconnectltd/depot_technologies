import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@/prisma/generated/client";
import type { ApiResponse } from "@/lib/types";

type SortOption =
  | "price_asc"
  | "price_desc"
  | "newest";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") ?? "";
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = (searchParams.get("sort") ?? "newest") as SortOption;

    const where: Prisma.ProductWhereInput = {
      active: true,
    };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { brand: { contains: q, mode: "insensitive" } },
      ];
    }

    if (category) {
      const allowed = ["STATIONERY", "ELECTRONICS", "SOFTWARE"];
      if (allowed.includes(category)) {
        where.category = category as never;
      }
    }

    if (minPrice || maxPrice) {
      where.retailPrice = {};
      if (minPrice) {
        where.retailPrice.gte = Number(minPrice);
      }
      if (maxPrice) {
        where.retailPrice.lte = Number(maxPrice);
      }
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput;
    switch (sort) {
      case "price_asc":
        orderBy = { retailPrice: "asc" };
        break;
      case "price_desc":
        orderBy = { retailPrice: "desc" };
        break;
      case "newest":
      default:
        orderBy = { createdAt: "desc" };
        break;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: {
            where: { isPrimary: true },
            take: 1,
          },
          inventory: true,
        },
        orderBy,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json<ApiResponse<{ products: typeof products; total: number }>>(
      { data: { products, total }, error: null },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to search products" },
      { status: 500 }
    );
  }
}

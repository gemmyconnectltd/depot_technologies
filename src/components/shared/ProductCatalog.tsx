import Image from "next/image";
import Link from "next/link";
import { Package, Star } from "lucide-react";
import { prisma } from "@/lib/db/prisma";
import { cn } from "@/lib/utils/cn";

export default async function ProductCatalog({
  category,
  brand,
  limit,
  featured,
  search,
  columns = 3,
}: {
  category?: "STATIONERY" | "ELECTRONICS" | "SOFTWARE";
  brand?: string;
  limit?: number;
  featured?: boolean;
  search?: string;
  columns?: 2 | 3 | 4;
}) {
  const products = await prisma.product.findMany({
    where: {
      active: true,
      ...(category && { category }),
      ...(brand && { brand }),
      ...(featured && { featured: true }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { brand: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      inventory: true,
    },
    orderBy: { createdAt: "desc" },
    ...(limit && { take: limit }),
  });

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <Package size={48} className="mx-auto text-zinc-300 mb-4" />
        <p className="text-zinc-500 text-lg">No products found</p>
      </div>
    );
  }

  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", gridCols[columns])}>
      {products.map((product) => {
        const img = product.images[0];
        const inStock = product.stockStatus === "IN_STOCK";

        return (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className={cn(
              "group flex flex-col rounded-lg overflow-hidden",
              "border border-zinc-200 bg-white",
              "hover:shadow-md",
              "motion-safe:transition-all duration-200"
            )}
          >
            <div className="relative aspect-square w-full overflow-hidden bg-white p-4">
              {img ? (
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className={cn(
                    "object-contain p-2",
                    "group-hover:scale-105",
                    "motion-safe:transition-transform duration-300"
                  )}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package size={48} className="text-zinc-200" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 px-4 pb-4 flex-1">
              {product.brand && (
                <p className="text-xs text-zinc-400 truncate">
                  {product.brand}
                </p>
              )}

              <h3 className={cn(
                "text-sm leading-snug text-zinc-800",
                "group-hover:text-electronics",
                "motion-safe:transition-colors duration-100",
                "line-clamp-2"
              )}>
                {product.name}
              </h3>

              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              <p className="text-xl font-bold text-zinc-900 mt-1">
                {Number(product.retailPrice).toLocaleString()}
                <span className="text-xs font-normal text-zinc-400 ml-0.5">RWF</span>
              </p>

              {product.bulkPrice && product.bulkMinQty && (
                <p className="text-xs text-rose-600">
                  {Number(product.bulkPrice).toLocaleString()} RWF / bulk ({product.bulkMinQty}+)
                </p>
              )}

              <p className={cn(
                "text-xs mt-auto pt-2",
                inStock ? "text-emerald-600" : "text-red-500"
              )}>
                {inStock
                  ? `In Stock`
                  : product.stockStatus === "LOW_STOCK"
                  ? "Only few left"
                  : "Currently unavailable"}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

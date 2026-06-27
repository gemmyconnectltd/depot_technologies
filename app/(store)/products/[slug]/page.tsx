import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Check,
  Package,
  Tag,
  Ruler,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { prisma } from "@/lib/db/prisma";
import { CATEGORY_CONFIG } from "@/lib/constants/categories";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug, active: true },
    select: { name: true, description: true },
  });
  if (!product) return { title: "Product Not Found — Depot Technologies" };
  return {
    title: `${product.name} — Depot Technologies`,
    description: product.description.slice(0, 160),
  };
}

function formatPrice(amount: number): string {
  return `RWF ${amount.toLocaleString("en-RW")}`;
}

function stockStatusConfig(status: string) {
  switch (status) {
    case "IN_STOCK":
      return {
        label: "In Stock",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    case "LOW_STOCK":
      return {
        label: "Low Stock",
        className: "bg-amber-50 text-amber-700 border-amber-200",
      };
    case "OUT_OF_STOCK":
      return {
        label: "Out of Stock",
        className: "bg-red-50 text-red-700 border-red-200",
      };
    default:
      return {
        label: status,
        className: "bg-zinc-50 text-zinc-600 border-zinc-200",
      };
  }
}

function categoryBadgeConfig(category: string) {
  switch (category) {
    case "STATIONERY":
      return {
        label: "Stationery",
        className: "bg-stationery-light text-stationery border-stationery/20",
      };
    case "ELECTRONICS":
      return {
        label: "Electronics",
        className: "bg-electronics-light text-electronics border-electronics/20",
      };
    case "SOFTWARE":
      return {
        label: "Software",
        className: "bg-software-light text-software border-software/20",
      };
    default:
      return {
        label: category,
        className: "bg-zinc-100 text-zinc-600 border-zinc-200",
      };
  }
}

function categoryHref(category: string): string {
  switch (category) {
    case "STATIONERY":
      return "/stationery";
    case "ELECTRONICS":
      return "/electronics";
    case "SOFTWARE":
      return "/software";
    default:
      return "/";
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug, active: true },
    include: {
      images: { orderBy: { order: "asc" } },
      inventory: true,
    },
  });

  if (!product) notFound();

  const stockCfg = stockStatusConfig(product.stockStatus);
  const catCfg = categoryBadgeConfig(product.category);
  const catHref = categoryHref(product.category);
  const catInfo = CATEGORY_CONFIG[product.category.toLowerCase() as keyof typeof CATEGORY_CONFIG];

  const specs = product.specs as Record<string, string> | null;
  const features = product.features as string[] | null;

  const relatedProducts = await prisma.product.findMany({
    where: {
      active: true,
      category: product.category,
      id: { not: product.id },
    },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className="bg-zinc-50 border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 motion-safe:transition-colors">Home</Link>
          <span aria-hidden>/</span>
          <Link href={catHref} className="hover:text-zinc-900 motion-safe:transition-colors">
            {catInfo?.label ?? product.category}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-zinc-900 font-medium truncate">{product.name}</span>
        </div>
      </section>

      <section aria-label="Product details" className="bg-white py-10 px-6">
        <div className="mx-auto max-w-6xl">
          <Link
            href={catHref}
            className="inline-flex items-center gap-1.5 mb-8 text-sm text-zinc-500 hover:text-zinc-900 motion-safe:transition-colors"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to {catInfo?.label ?? "Category"}
          </Link>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="space-y-4">
              {product.images.length > 0 ? (
                <>
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {product.images.map((img) => (
                        <div
                          key={img.id}
                          className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200"
                        >
                          <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="80px" />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-square rounded-2xl bg-zinc-100 flex items-center justify-center border border-zinc-200">
                  <Package size={64} className="text-zinc-300" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={cn("inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border", catCfg.className)}>
                    <Tag size={12} />
                    {catCfg.label}
                  </span>
                  <span className={cn("inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border", stockCfg.className)}>
                    <Package size={12} />
                    {stockCfg.label}
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                  {product.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                  {product.brand && (
                    <span className="flex items-center gap-1">
                      <span className="font-medium text-zinc-700">Brand:</span>
                      {product.brand}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <span className="font-medium text-zinc-700">SKU:</span>
                    {product.sku}
                  </span>
                </div>
              </div>

              <p className="text-base leading-relaxed text-zinc-600">{product.description}</p>

              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-zinc-900">
                    {formatPrice(Number(product.retailPrice))}
                  </span>
                  <span className="text-sm text-zinc-500">Retail price</span>
                </div>
                {product.bulkPrice && product.bulkMinQty && (
                  <div className="flex items-baseline gap-3 pt-2 border-t border-zinc-200">
                    <span className="text-xl font-semibold text-electronics">
                      {formatPrice(Number(product.bulkPrice))}
                    </span>
                    <span className="text-sm text-zinc-500">
                      Bulk price (min. {product.bulkMinQty} units)
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm bg-zinc-300 text-zinc-500 cursor-not-allowed motion-safe:transition-all duration-150"
                  aria-label="Add to Cart"
                >
                  <ShoppingCart size={18} aria-hidden />
                  Add to Cart
                </button>
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm border border-zinc-300 text-zinc-500 cursor-not-allowed motion-safe:transition-all duration-150"
                  aria-label="Add to Wishlist"
                >
                  <Heart size={18} aria-hidden />
                  Add to Wishlist
                </button>
              </div>

              {features && features.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                    Key Features
                  </h2>
                  <ul className="space-y-2">
                    {features.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-zinc-700">
                        <Check size={16} className="mt-0.5 shrink-0 text-emerald-500" aria-hidden />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {specs && Object.keys(specs).length > 0 && (
            <div className="mt-14 space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900">Specifications</h2>
              <div className="rounded-xl border border-zinc-200 overflow-hidden bg-white">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(specs).map(([key, value], index) => (
                      <tr key={key} className={index % 2 === 0 ? "bg-white" : "bg-zinc-50"}>
                        <th className="px-5 py-3 text-left font-medium text-zinc-700 whitespace-nowrap w-48">
                          <span className="flex items-center gap-2">
                            <Ruler size={14} className="text-zinc-400" />
                            {key}
                          </span>
                        </th>
                        <td className="px-5 py-3 text-zinc-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section aria-label="Related products" className="bg-zinc-50 py-16 px-6">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Related Products</h2>
              <p className="text-sm text-zinc-500">You might also be interested in these items</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rp) => {
                const rpImg = rp.images[0];
                return (
                  <Link
                    key={rp.id}
                    href={`/products/${rp.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-zinc-200 bg-white hover:shadow-xl hover:-translate-y-1 motion-safe:transition-all duration-200"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      {rpImg ? (
                        <Image
                          src={rpImg.url}
                          alt={rpImg.alt}
                          fill
                          className="object-cover group-hover:scale-105 motion-safe:transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
                          <Package size={40} className="text-zinc-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-3 p-5 flex-1">
                      <h3 className="font-bold text-zinc-900 text-base">{rp.name}</h3>
                      <p className="text-sm leading-relaxed text-zinc-500 line-clamp-2">{rp.description}</p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-100">
                        <span className="font-bold text-lg text-zinc-900">
                          {formatPrice(Number(rp.retailPrice))}
                        </span>
                        <span className={cn(
                          "text-xs font-semibold px-2 py-1 rounded-full",
                          rp.stockStatus === "IN_STOCK"
                            ? "bg-emerald-50 text-emerald-700"
                            : rp.stockStatus === "LOW_STOCK"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                        )}>
                          {stockStatusConfig(rp.stockStatus).label}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

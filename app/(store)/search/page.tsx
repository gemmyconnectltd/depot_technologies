import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ArrowUpDown,
  Package,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { prisma } from "@/lib/db/prisma";
import { CATEGORY_CONFIG } from "@/lib/constants/categories";

type SortOption = "price_asc" | "price_desc" | "newest";

interface Props {
  searchParams: Promise<{
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: SortOption;
  }>;
}

export const metadata: Metadata = {
  title: "Search — Depot Technologies",
  description: "Search products across stationery, electronics and software.",
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const CATEGORIES = [
  { value: "STATIONERY", label: "Stationery" },
  { value: "ELECTRONICS", label: "Electronics" },
  { value: "SOFTWARE", label: "Software" },
] as const;

function categoryStyle(category: string) {
  const key = category.toLowerCase() as keyof typeof CATEGORY_CONFIG;
  const cfg = CATEGORY_CONFIG[key];
  return {
    dot: cfg?.iconColor ?? "text-zinc-500",
    bg: cfg?.iconBg ?? "bg-zinc-100",
    bar: cfg?.accentBar ?? "bg-zinc-300",
    label: cfg?.label ?? category,
  };
}

function formatPrice(amount: number): string {
  return `RWF ${amount.toLocaleString("en-RW")}`;
}

function stockBadge(status: string) {
  switch (status) {
    case "IN_STOCK":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "LOW_STOCK":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "OUT_OF_STOCK":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-zinc-50 text-zinc-500 border-zinc-200";
  }
}

function buildUrl(
  base: string,
  current: Record<string, string | undefined>,
  updates: Record<string, string | undefined>
): string {
  const params = new URLSearchParams();
  const all = { ...current, ...updates };
  for (const [k, v] of Object.entries(all)) {
    if (v) params.set(k, v);
  }
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

function FilterSidebar({
  currentCategory,
  paramsQ,
}: {
  currentCategory: string;
  paramsQ: string;
}) {
  return (
    <aside
      aria-label="Search filters"
      className={cn(
        "w-full lg:w-64 shrink-0",
        "hidden lg:flex flex-col gap-6"
      )}
    >
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-zinc-400" />
          Category
        </h3>
        <div className="space-y-1">
          <Link
            href={buildUrl("/search", { q: paramsQ }, { category: "" })}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
              "motion-safe:transition-colors duration-150",
              !currentCategory
                ? "bg-zinc-100 text-zinc-900 font-medium"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
            )}
          >
            All Categories
          </Link>
          {CATEGORIES.map(({ value, label }) => {
            const style = categoryStyle(value);
            return (
              <Link
                key={value}
                href={buildUrl("/search", { q: paramsQ }, { category: value })}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
                  "motion-safe:transition-colors duration-150",
                  currentCategory === value
                    ? "bg-zinc-100 text-zinc-900 font-medium"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                )}
              >
                <span className={cn("w-2 h-2 rounded-full", style.dot)} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
          <ArrowUpDown size={14} className="text-zinc-400" />
          Price Range
        </h3>
        <form method="GET" action="/search">
          {paramsQ && (
            <input type="hidden" name="q" value={paramsQ} />
          )}
          {currentCategory && (
            <input type="hidden" name="category" value={currentCategory} />
          )}
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="minPrice"
              defaultValue=""
              placeholder="Min"
              aria-label="Minimum price"
              className={cn(
                "w-full h-9 px-3 rounded-lg text-sm",
                "border border-zinc-200 bg-white",
                "text-zinc-900 placeholder:text-zinc-400",
                "focus:border-electronics focus:ring-1 focus:ring-electronics/30",
                "outline-none motion-safe:transition-colors duration-150"
              )}
            />
            <span className="text-zinc-300 text-sm">—</span>
            <input
              type="number"
              name="maxPrice"
              defaultValue=""
              placeholder="Max"
              aria-label="Maximum price"
              className={cn(
                "w-full h-9 px-3 rounded-lg text-sm",
                "border border-zinc-200 bg-white",
                "text-zinc-900 placeholder:text-zinc-400",
                "focus:border-electronics focus:ring-1 focus:ring-electronics/30",
                "outline-none motion-safe:transition-colors duration-150"
              )}
            />
          </div>
          <button
            type="submit"
            className={cn(
              "mt-2 inline-flex items-center justify-center",
              "w-full h-9 rounded-lg text-sm font-medium",
              "bg-zinc-100 text-zinc-700",
              "hover:bg-zinc-200",
              "motion-safe:transition-colors duration-150"
            )}
          >
            Apply
          </button>
        </form>
      </div>
    </aside>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = sp.q ?? "";
  const category = sp.category ?? "";
  const minPrice = sp.minPrice ?? "";
  const maxPrice = sp.maxPrice ?? "";
  const sort = sp.sort ?? "newest";

  const where: Record<string, unknown> = { active: true };
  const searchFilter: Record<string, unknown>[] = [];

  if (q) {
    searchFilter.push(
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      { brand: { contains: q, mode: "insensitive" } }
    );
    where.OR = searchFilter;
  }

  if (category) {
    const allowed = ["STATIONERY", "ELECTRONICS", "SOFTWARE"];
    if (allowed.includes(category)) {
      where.category = category;
    }
  }

  if (minPrice || maxPrice) {
    const priceFilter: Record<string, unknown> = {};
    if (minPrice) priceFilter.gte = Number(minPrice);
    if (maxPrice) priceFilter.lte = Number(maxPrice);
    where.retailPrice = priceFilter;
  }

  let orderBy: Record<string, string>;
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
      where: where as never,
      include: {
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        inventory: true,
      },
      orderBy: orderBy as never,
    }),
    prisma.product.count({ where: where as never }),
  ]);

  const hasFilters = !!(category || minPrice || maxPrice || sort !== "newest");

  return (
    <>
      <section
        aria-label="Search results header"
        className={cn("bg-white border-b border-zinc-200")}
      >
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              {q ? (
                <>
                  Results for &ldquo;{q}&rdquo;
                </>
              ) : (
                "Browse Products"
              )}
            </h1>
            <p className="text-sm text-zinc-500">
              {total} {total === 1 ? "product" : "products"} found
              {category && (
                <>
                  {" in "}
                  <span className="font-medium text-zinc-700">
                    {CATEGORIES.find((c) => c.value === category)?.label ?? category}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-label="Search results"
        className="bg-zinc-50 py-10 px-6"
      >
        <div className="mx-auto max-w-6xl">
          {!q && !category && !minPrice && !maxPrice ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div
                className={cn(
                  "flex items-center justify-center",
                  "w-16 h-16 rounded-2xl",
                  "bg-zinc-100 mb-6"
                )}
              >
                <Search size={28} className="text-zinc-400" />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-2">
                Find what you need
              </h2>
              <p className="text-sm text-zinc-500 max-w-sm mb-8">
                Use the search bar above to find products across
                stationery, electronics and software categories.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {CATEGORIES.map(({ value, label }) => {
                  const style = categoryStyle(value);
                  return (
                    <Link
                      key={value}
                      href={`/search?category=${value}`}
                      className={cn(
                        "inline-flex items-center gap-2",
                        "px-4 py-2 rounded-lg text-sm font-medium",
                        style.bg,
                        style.dot,
                        "hover:opacity-80",
                        "motion-safe:transition-opacity duration-150"
                      )}
                    >
                      <span className={cn("w-2 h-2 rounded-full", style.dot)} />
                      Browse {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : total === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div
                className={cn(
                  "flex items-center justify-center",
                  "w-16 h-16 rounded-2xl",
                  "bg-zinc-100 mb-6"
                )}
              >
                <Package size={28} className="text-zinc-400" />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 mb-2">
                No products found
              </h2>
              <p className="text-sm text-zinc-500 max-w-sm mb-8">
                {q
                  ? `We couldn't find any results for "${q}".`
                  : "No products match your filter criteria."}
                {" "}Try adjusting your search terms or filters.
              </p>
              <Link
                href="/search"
                className={cn(
                  "inline-flex items-center gap-2",
                  "px-5 py-2.5 rounded-lg text-sm font-semibold",
                  "bg-electronics text-white",
                  "hover:bg-electronics-bar",
                  "motion-safe:transition-colors duration-150"
                )}
              >
                Clear Filters
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10">
              <FilterSidebar
                currentCategory={category}
                paramsQ={q}
              />

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {hasFilters && (
                      <Link
                        href={buildUrl("/search", { q }, {
                          category: "",
                          minPrice: "",
                          maxPrice: "",
                          sort: "",
                        })}
                        className={cn(
                          "inline-flex items-center gap-1.5",
                          "px-3 py-1.5 rounded-lg text-xs font-medium",
                          "bg-zinc-200 text-zinc-600",
                          "hover:bg-zinc-300",
                          "motion-safe:transition-colors duration-150"
                        )}
                      >
                        <X size={12} />
                        Clear all
                      </Link>
                    )}
                    {category && (
                      <Link
                        href={buildUrl("/search", { q }, { category: "" })}
                        className={cn(
                          "inline-flex items-center gap-1.5",
                          "px-3 py-1.5 rounded-lg text-xs font-medium",
                          "bg-electronics-light text-electronics",
                          "hover:opacity-80",
                          "motion-safe:transition-opacity duration-150"
                        )}
                      >
                        <X size={12} />
                        {CATEGORIES.find((c) => c.value === category)?.label}
                      </Link>
                    )}
                  </div>

                  <form method="GET" action="/search">
                    {q && <input type="hidden" name="q" value={q} />}
                    {category && <input type="hidden" name="category" value={category} />}
                    {minPrice && <input type="hidden" name="minPrice" value={minPrice} />}
                    {maxPrice && <input type="hidden" name="maxPrice" value={maxPrice} />}
                    <div className="relative">
                      <select
                        name="sort"
                        defaultValue={sort}
                        onChange={(e) => e.target.form?.requestSubmit()}
                        className={cn(
                          "appearance-none h-9 pl-3 pr-8 rounded-lg text-sm",
                          "border border-zinc-200 bg-white",
                          "text-zinc-700 font-medium",
                          "focus:border-electronics focus:ring-1 focus:ring-electronics/30",
                          "outline-none cursor-pointer",
                          "motion-safe:transition-colors duration-150"
                        )}
                      >
                        {SORT_OPTIONS.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className={cn(
                          "absolute right-2.5 top-1/2 -translate-y-1/2",
                          "text-zinc-400 pointer-events-none"
                        )}
                      />
                    </div>
                  </form>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => {
                    const img = product.images[0];
                    const style = categoryStyle(product.category);
                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className={cn(
                          "group flex flex-col rounded-2xl overflow-hidden",
                          "border border-zinc-200 bg-white",
                          "hover:shadow-xl hover:-translate-y-1",
                          "motion-safe:transition-all duration-200"
                        )}
                      >
                        <div className="relative h-48 w-full overflow-hidden">
                          {img ? (
                            <Image
                              src={img.url}
                              alt={img.alt}
                              fill
                              className={cn(
                                "object-cover",
                                "group-hover:scale-105",
                                "motion-safe:transition-transform duration-500"
                              )}
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div
                              className={cn(
                                "w-full h-full flex items-center justify-center",
                                style.bg
                              )}
                            >
                              <Tag size={32} className={style.dot} />
                            </div>
                          )}
                          <div
                            aria-hidden
                            className={cn(
                              "absolute inset-0",
                              "bg-gradient-to-t from-black/20 to-transparent"
                            )}
                          />
                          <div
                            className={cn(
                              "absolute top-3 left-3",
                              "px-2 py-0.5 rounded-full",
                              "text-[11px] font-semibold border",
                              stockBadge(product.stockStatus)
                            )}
                          >
                            {product.stockStatus === "IN_STOCK"
                              ? "In Stock"
                              : product.stockStatus === "LOW_STOCK"
                              ? "Low Stock"
                              : "Out of Stock"}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 p-5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={cn("w-2 h-2 rounded-full", style.dot)} />
                            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                              {style.label}
                            </span>
                          </div>
                          <h3
                            className={cn(
                              "font-bold text-zinc-900 text-base",
                              "line-clamp-1"
                            )}
                          >
                            {product.name}
                          </h3>
                          {product.brand && (
                            <p className="text-xs text-zinc-400">
                              {product.brand}
                            </p>
                          )}
                          <p
                            className={cn(
                              "text-sm leading-relaxed text-zinc-500",
                              "line-clamp-2 mt-1"
                            )}
                          >
                            {product.description}
                          </p>
                          <div
                            className={cn(
                              "flex items-center justify-between mt-auto",
                              "pt-3 border-t border-zinc-100"
                            )}
                          >
                            <span
                              className={cn(
                                "font-bold text-lg text-zinc-900"
                              )}
                            >
                              {formatPrice(Number(product.retailPrice))}
                            </span>
                            <span className="text-xs text-zinc-400">
                              {product.inventory
                                ? `${product.inventory.quantity} in stock`
                                : "—"}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

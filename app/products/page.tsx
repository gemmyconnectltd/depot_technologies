import type { Metadata } from "next";
import Link from "next/link";
import ProductCatalog from "@/components/shared/ProductCatalog";
import CTABanner from "@/components/shared/CTABanner";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "All Products — Depot Technologies",
  description: "Browse our full catalogue of electronics, stationery, and software products.",
};

const SIDEBAR = [
  { label: "All Products", href: "/products", value: null },
  { label: "Electronics", href: "/products?category=ELECTRONICS", value: "ELECTRONICS" },
  { label: "Stationery", href: "/products?category=STATIONERY", value: "STATIONERY" },
  { label: "Software", href: "/products?category=SOFTWARE", value: "SOFTWARE" },
] as const;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = ["ELECTRONICS", "STATIONERY", "SOFTWARE"].includes(category ?? "")
    ? (category as "ELECTRONICS" | "STATIONERY" | "SOFTWARE")
    : undefined;

  return (
    <>
      <div className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-4 sm:py-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
              {active ? active.charAt(0) + active.slice(1).toLowerCase() : "All Products"}
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5 hidden sm:block">
              Browse our catalogue with real-time pricing and stock levels.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-zinc-50 min-h-screen">
        <div className="mx-auto max-w-6xl px-6 py-6 flex gap-8">
          <aside className="hidden lg:block w-52 shrink-0">
            <h2 className="text-sm font-semibold text-zinc-900 mb-3 uppercase tracking-wider">
              Categories
            </h2>
            <nav className="flex flex-col gap-0.5" aria-label="Product categories">
              {SIDEBAR.map(({ label, href, value }) => {
                const isActive = value === null ? active === undefined : value === active;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm",
                      "motion-safe:transition-colors duration-100",
                      isActive
                        ? "bg-electronics text-white font-medium"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </aside>
          <div className="flex-1 min-w-0">
            <ProductCatalog category={active} columns={4} />
          </div>
        </div>
      </div>
      <CTABanner
        title="Can't find what you're looking for?"
        subtitle="We source thousands of products beyond our catalogue. Tell us what you need and we'll get you a quote."
        cta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}

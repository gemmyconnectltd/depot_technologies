import type { Metadata } from "next";
import Link from "next/link";
import ProductCatalog from "@/components/shared/ProductCatalog";
import CTABanner from "@/components/shared/CTABanner";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Software & Projects — Depot Technologies",
  description: "Licenses, subscriptions and digital assets for modern teams.",
};

const SIDEBAR = [
  { label: "All Products", href: "/products", value: null },
  { label: "Electronics", href: "/electronics", value: "ELECTRONICS" },
  { label: "Stationery", href: "/stationery", value: "STATIONERY" },
  { label: "Software", href: "/software", value: "SOFTWARE" },
] as const;

export default function SoftwarePage() {
  return (
    <>
      <div className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-4 sm:py-6">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">Software & Projects</h1>
          <p className="text-sm text-zinc-500 mt-0.5 hidden sm:block">
            Genuine software licenses, cloud subscriptions and digital assets.
          </p>
        </div>
      </div>
      <div className="bg-zinc-50 min-h-screen">
        <div className="mx-auto max-w-6xl px-6 py-6 flex gap-8">
          <aside className="hidden lg:block w-52 shrink-0">
            <h2 className="text-sm font-semibold text-zinc-900 mb-3 uppercase tracking-wider">Categories</h2>
            <nav className="flex flex-col gap-0.5" aria-label="Product categories">
              {SIDEBAR.map(({ label, href, value }) => {
                const isActive = value === "SOFTWARE";
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
            <ProductCatalog category="SOFTWARE" columns={4} />
          </div>
        </div>
      </div>
      <CTABanner
        title="Need software for your entire organisation?"
        subtitle="We handle volume licensing and renewals. Let us simplify your software procurement."
        cta={{ label: "Talk to Us", href: "/contact" }}
      />
    </>
  );
}

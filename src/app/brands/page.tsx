import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BRANDS } from "@/lib/constants/brands";
import { prisma } from "@/lib/db/prisma";
import { cn } from "@/lib/utils/cn";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Brands — Depot Technologies",
  description: "Browse products by brand. Find official Apple, Sony, JBL, HP, Dell and more at Depot Technologies.",
};

export default async function BrandsPage() {
  const counts = await Promise.all(
    BRANDS.map(async (brand) => {
      const count = await prisma.product.count({
        where: { brand: { equals: brand.name, mode: "insensitive" }, active: true },
      });
      return { slug: brand.slug, count };
    })
  );
  const countMap = Object.fromEntries(counts.map((c) => [c.slug, c.count]));

  return (
    <>
      <div className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-4 sm:py-6">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">Brands</h1>
          <p className="text-sm text-zinc-500 mt-0.5 hidden sm:block">
            Shop from the biggest brands in electronics, office equipment and audio.
          </p>
        </div>
      </div>
      <div className="bg-zinc-50 min-h-screen">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {BRANDS.map((brand) => {
              const count = countMap[brand.slug] ?? 0;
              return (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className={cn(
                    "group flex flex-col rounded-xl overflow-hidden",
                    "bg-white border border-zinc-200",
                    "hover:shadow-md hover:border-zinc-300",
                    "motion-safe:transition-all duration-200"
                  )}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-50">
                    <Image
                      src={brand.image}
                      alt={brand.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 motion-safe:transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-zinc-900">{brand.name}</h3>
                    <p className="text-xs text-zinc-500 mt-1">{brand.description}</p>
                    <p className="text-xs text-zinc-400 mt-2">
                      {count} product{count !== 1 ? "s" : ""}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <CTABanner
        title="Don't see your preferred brand?"
        subtitle="We source products from hundreds of suppliers. Tell us what you need and we'll find it."
        cta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}

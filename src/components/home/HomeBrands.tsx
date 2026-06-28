import Image from "next/image";
import Link from "next/link";
import { BRANDS } from "@/lib/constants/brands";
import { cn } from "@/lib/utils/cn";

const FEATURED_BRANDS = [
  "apple", "sony", "jbl", "bose", "marshall",
  "hp", "epson", "dell", "lenovo", "logitech",
  "konica-minolta", "fujifilm",
];

export default function HomeBrands() {
  const brands = BRANDS.filter((b) => FEATURED_BRANDS.includes(b.slug));

  return (
    <section aria-label="Shop by brand" className="bg-white py-8 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-zinc-900">Shop by Brand</h2>
          <Link
            href="/products"
            className="text-sm text-electronics hover:text-electronics-bar font-medium"
          >
            See all
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className={cn(
                "group flex flex-col items-center gap-2",
                "rounded-xl p-3",
                "bg-white border border-zinc-200",
                "hover:shadow-md hover:border-zinc-300",
                "motion-safe:transition-all duration-200"
              )}
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-zinc-50">
                <Image
                  src={brand.image}
                  alt={brand.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 motion-safe:transition-transform duration-300"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
              </div>
              <span className="text-xs font-semibold text-zinc-700 text-center leading-tight">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

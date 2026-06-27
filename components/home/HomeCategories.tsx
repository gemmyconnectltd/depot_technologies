import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/data/home";
import { cn } from "@/lib/utils/cn";

export default function HomeCategories() {
  return (
    <section aria-label="Shop by category" className="bg-white py-8 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-zinc-900">Shop by Category</h2>
          <Link
            href="/products"
            className="text-sm text-electronics hover:text-electronics-bar font-medium"
          >
            See all
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={cn(
                "group flex flex-col items-center gap-2",
                "rounded-xl p-4",
                "bg-white border border-zinc-200",
                "hover:shadow-md hover:border-zinc-300",
                "motion-safe:transition-all duration-200"
              )}
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-zinc-50">
                <Image
                  src={cat.image}
                  alt={cat.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 motion-safe:transition-transform duration-300"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
              </div>
              <span className="text-xs font-medium text-zinc-700 text-center leading-tight">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

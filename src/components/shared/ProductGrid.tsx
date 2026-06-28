import Image from "next/image";
import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface Product {
  name: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  tags?: string[];
  image: string;
  imageAlt: string;
  slug?: string;
}

export default function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => {
        const card = (
          <article
            key={p.name}
            className={cn(
              "group flex flex-col rounded-2xl overflow-hidden",
              "border border-zinc-200 bg-white",
              "hover:shadow-xl hover:-translate-y-1",
              "motion-safe:transition-all duration-200"
            )}
          >
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                className={cn(
                  "object-cover",
                  "group-hover:scale-105",
                  "motion-safe:transition-transform duration-500"
                )}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                aria-hidden
                className={cn(
                  "absolute inset-0",
                  "bg-gradient-to-t from-black/30 to-transparent"
                )}
              />
              <div
                className={cn(
                  "absolute bottom-4 left-4",
                  "p-2 rounded-lg",
                  "bg-white/90 backdrop-blur-sm shadow-sm",
                  p.iconBg
                )}
                aria-hidden
              >
                <p.icon size={18} className={p.iconColor} />
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 flex-1">
              <div className="space-y-1.5">
                <h3
                  className={cn(
                    "font-bold text-zinc-900 text-base"
                  )}
                >
                  {p.name}
                </h3>
                <p
                  className={cn(
                    "text-sm leading-relaxed text-zinc-500"
                  )}
                >
                  {p.description}
                </p>
              </div>

              {p.tags && p.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "px-2.5 py-1 rounded-full",
                        "text-xs font-semibold",
                        p.iconBg,
                        p.iconColor
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        );

        return p.slug ? (
          <Link key={p.name} href={`/products/${p.slug}`}>
            {card}
          </Link>
        ) : (
          card
        );
      })}
    </div>
  );
}

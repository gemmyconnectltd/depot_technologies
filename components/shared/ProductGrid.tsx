import Image from "next/image";
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
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <article
          key={p.name}
          className={cn(
            "flex flex-col rounded-xl overflow-hidden",
            "border border-zinc-200 bg-white",
            "hover:shadow-md hover:-translate-y-0.5",
            "motion-safe:transition-all duration-200"
          )}
        >
          {/* Product image */}
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={p.image}
              alt={p.imageAlt}
              fill
              className={cn(
                "object-cover",
                "hover:scale-105",
                "motion-safe:transition-transform duration-300"
              )}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3 p-5 flex-1">
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "p-2 rounded-lg shrink-0",
                  p.iconBg
                )}
                aria-hidden
              >
                <p.icon size={16} className={p.iconColor} />
              </span>
              <div className="space-y-1 min-w-0">
                <h3 className="font-semibold text-zinc-900 text-sm">
                  {p.name}
                </h3>
                <p className="text-xs leading-relaxed text-zinc-500">
                  {p.description}
                </p>
              </div>
            </div>

            {p.tags && p.tags.length > 0 && (
              <div
                className={cn(
                  "flex flex-wrap gap-1.5 pt-2",
                  "border-t border-zinc-100"
                )}
              >
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "px-2.5 py-0.5 rounded-full",
                      "text-xs font-medium",
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
      ))}
    </div>
  );
}

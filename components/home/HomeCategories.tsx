import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/data/home";
import SectionHeader from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils/cn";

export default function HomeCategories() {
  return (
    <section
      aria-label="Product categories"
      className="bg-zinc-50 py-20 px-6"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionHeader
          label="What we offer"
          title="Three categories, one supplier"
          subtitle={
            "Everything your business needs — "
            + "sourced, stocked and ready to deliver."
          }
          centered
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={cn(
                "group flex flex-col rounded-xl overflow-hidden",
                "border border-zinc-200 bg-white",
                "hover:shadow-lg hover:-translate-y-0.5",
                "motion-safe:transition-all duration-200",
                "focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-blue-500"
              )}
            >
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.imageAlt}
                  fill
                  className={cn(
                    "object-cover",
                    "group-hover:scale-105",
                    "motion-safe:transition-transform duration-300"
                  )}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Color overlay top bar */}
                <div
                  aria-hidden
                  className={cn(
                    "absolute top-0 left-0 right-0 h-1",
                    cat.accentBorder.replace("border-", "bg-")
                  )}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 p-5 flex-1">
                <span
                  className={cn("w-fit p-2.5 rounded-lg", cat.iconBg)}
                  aria-hidden
                >
                  <cat.icon size={18} className={cat.iconColor} />
                </span>
                <div className="space-y-1 flex-1">
                  <p className="font-semibold text-zinc-900">
                    {cat.label}
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-500">
                    {cat.description}
                  </p>
                </div>
                <span
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold",
                    cat.iconColor,
                    "group-hover:gap-3",
                    "motion-safe:transition-all duration-150"
                  )}
                >
                  View products
                  <ArrowRight size={12} aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface CategoryCardProps {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  accentBorder: string;
}

export default function CategoryCard({
  label,
  description,
  href,
  icon: Icon,
  iconColor,
  iconBg,
  accentBorder,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-5",
        "rounded-xl p-6 bg-white overflow-hidden",
        "border border-zinc-200",
        "hover:shadow-lg hover:-translate-y-0.5",
        "motion-safe:transition-all duration-200",
        "focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-blue-500"
      )}
    >
      {/* Colored top accent bar */}
      <div
        aria-hidden
        className={cn(
          "absolute top-0 left-0 right-0 h-1 rounded-t-xl",
          accentBorder.replace("border-", "bg-")
        )}
      />

      <span
        className={cn("w-fit p-3 rounded-xl mt-2", iconBg)}
        aria-hidden
      >
        <Icon size={24} className={iconColor} />
      </span>

      <div className="flex-1 space-y-2">
        <p
          className={cn(
            "font-semibold text-zinc-900 text-base"
          )}
        >
          {label}
        </p>
        <p className="text-sm leading-relaxed text-zinc-500">
          {description}
        </p>
      </div>

      <span
        className={cn(
          "flex items-center gap-1.5 text-xs font-semibold",
          iconColor,
          "group-hover:gap-2.5",
          "motion-safe:transition-all duration-150"
        )}
      >
        View products
        <ArrowRight size={13} aria-hidden />
      </span>
    </Link>
  );
}

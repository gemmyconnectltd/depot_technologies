import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ProductCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  tags?: string[];
}

export default function ProductCard({
  name,
  description,
  icon: Icon,
  iconColor,
  iconBg,
  tags,
}: ProductCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-xl p-6",
        "border border-zinc-200 bg-white",
        "hover:shadow-md hover:-translate-y-0.5",
        "motion-safe:transition-all duration-200"
      )}
    >
      <div className="flex items-start gap-4">
        <span
          className={cn("p-2.5 rounded-lg shrink-0", iconBg)}
          aria-hidden
        >
          <Icon size={20} className={iconColor} />
        </span>
        <div className="space-y-1 min-w-0">
          <h3
            className={cn(
              "font-semibold text-zinc-900 leading-snug"
            )}
          >
            {name}
          </h3>
          <p
            className={cn(
              "text-sm leading-relaxed text-zinc-500"
            )}
          >
            {description}
          </p>
        </div>
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100">
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "px-2.5 py-1 rounded-full",
                "text-xs font-medium",
                iconBg,
                iconColor
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

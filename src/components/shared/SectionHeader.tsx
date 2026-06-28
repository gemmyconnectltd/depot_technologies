import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-2", centered && "text-center")}>
      {label && (
        <p
          className={cn(
            "text-xs font-semibold uppercase",
            "tracking-widest text-zinc-400"
          )}
        >
          {label}
        </p>
      )}
      <h2
        className={cn(
          "text-2xl font-bold tracking-tight",
          "text-zinc-900 sm:text-3xl"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-base leading-relaxed text-zinc-500",
            "max-w-2xl",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

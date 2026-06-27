import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface CTABannerProps {
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
}

export default function CTABanner({
  title,
  subtitle,
  cta,
}: CTABannerProps) {
  return (
    <section
      aria-label="Call to action"
      className={cn(
        "relative w-full overflow-hidden py-16 px-6",
        "bg-gradient-to-br",
        "from-electronics-light via-white to-software-light"
      )}
    >
      {/* Subtle dot pattern */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-[radial-gradient(circle,rgba(37,99,235,0.06)_1px,transparent_1px)]",
          "bg-[size:32px_32px]"
        )}
      />

      <div
        className={cn(
          "relative mx-auto max-w-3xl",
          "text-center space-y-6"
        )}
      >
        <h2
          className={cn(
            "text-3xl font-black tracking-tight",
            "text-zinc-900 sm:text-4xl"
          )}
        >
          {title}
        </h2>
        <p className="text-base leading-relaxed text-zinc-500">
          {subtitle}
        </p>
        <Link
          href={cta.href}
          className={cn(
            "inline-flex items-center gap-2",
            "px-7 py-3.5 rounded-lg",
            "bg-electronics text-white font-semibold",
            "hover:bg-electronics-bar",
            "shadow-lg shadow-electronics/20",
            "motion-safe:transition-colors duration-150",
            "focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-electronics"
          )}
        >
          {cta.label}
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  );
}

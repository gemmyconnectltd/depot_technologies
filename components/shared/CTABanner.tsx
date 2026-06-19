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
        "relative w-full overflow-hidden py-24 px-6",
        "bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700"
      )}
    >
      {/* Grid overlay */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]",
          "bg-[size:48px_48px]"
        )}
      />

      {/* Glow */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-0 left-1/2 -translate-x-1/2",
          "w-96 h-48 rounded-full",
          "bg-white/10 blur-3xl"
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
            "text-3xl font-bold tracking-tight",
            "text-white sm:text-4xl"
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "text-base leading-relaxed text-blue-100"
          )}
        >
          {subtitle}
        </p>
        <Link
          href={cta.href}
          className={cn(
            "inline-flex items-center gap-2",
            "px-6 py-3 rounded-lg",
            "bg-white text-blue-700 text-sm font-semibold",
            "hover:bg-blue-50",
            "motion-safe:transition-colors duration-150",
            "focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-white"
          )}
        >
          {cta.label}
          <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
    </section>
  );
}

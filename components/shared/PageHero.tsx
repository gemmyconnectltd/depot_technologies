import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function PageHero({
  label,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section
      aria-label="Page hero"
      className={cn(
        "relative w-full overflow-hidden",
        "py-24 px-6 sm:py-32",
        "bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
      )}
    >
      {/* Decorative grid */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]",
          "bg-[size:48px_48px]"
        )}
      />

      {/* Glow blobs */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-32 -left-32",
          "w-96 h-96 rounded-full",
          "bg-blue-500/20 blur-3xl"
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-32 -right-32",
          "w-96 h-96 rounded-full",
          "bg-violet-500/20 blur-3xl"
        )}
      />

      <div
        className={cn(
          "relative mx-auto max-w-3xl",
          "text-center space-y-7"
        )}
      >
        {label && (
          <span
            className={cn(
              "inline-flex items-center px-3 py-1",
              "rounded-full border border-blue-500/30",
              "bg-blue-500/10 text-blue-300",
              "text-xs font-semibold uppercase tracking-widest"
            )}
          >
            {label}
          </span>
        )}

        <h1
          className={cn(
            "text-4xl font-bold tracking-tight",
            "text-white sm:text-5xl lg:text-6xl"
          )}
        >
          {title}
        </h1>

        <p
          className={cn(
            "text-lg leading-relaxed",
            "text-slate-300 max-w-2xl mx-auto"
          )}
        >
          {subtitle}
        </p>

        {(primaryCta || secondaryCta) && (
          <div
            className={cn(
              "flex flex-col sm:flex-row",
              "items-center justify-center gap-3 pt-2"
            )}
          >
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className={cn(
                  "inline-flex items-center gap-2",
                  "px-6 py-3 rounded-lg",
                  "bg-blue-600 text-white text-sm font-medium",
                  "hover:bg-blue-500",
                  "motion-safe:transition-colors duration-150",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-blue-400"
                )}
              >
                {primaryCta.label}
                <ArrowRight size={15} aria-hidden />
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={cn(
                  "inline-flex items-center gap-2",
                  "px-6 py-3 rounded-lg",
                  "border border-slate-600",
                  "text-sm font-medium text-slate-300",
                  "hover:border-slate-400 hover:text-white",
                  "motion-safe:transition-colors duration-150",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-slate-400"
                )}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

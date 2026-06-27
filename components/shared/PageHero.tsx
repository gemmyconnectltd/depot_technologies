import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
}

export default function PageHero({
  label,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  image = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=90",
  imageAlt = "Technology background",
}: PageHeroProps) {
  return (
    <section
      aria-label="Page hero"
      className={cn(
        "relative w-full overflow-hidden",
        "min-h-[280px] flex items-center",
        "bg-zinc-50"
      )}
    >
      {/* Image — right half only */}
      <div className="absolute inset-0 lg:left-[50%]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="50vw"
        />
        {/* Fade left edge into zinc-50 */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-r from-zinc-50 via-zinc-50/40 to-transparent"
          )}
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative w-full mx-auto max-w-6xl",
          "px-6 py-12 sm:py-16",
          "grid lg:grid-cols-2"
        )}
      >
        <div className="flex flex-col gap-6 max-w-lg">
          {label && (
            <span
              className={cn(
                "w-fit inline-flex items-center",
                "px-3 py-1 rounded-full",
                "bg-electronics-light border border-electronics/20",
                "text-electronics text-xs font-bold uppercase tracking-widest"
              )}
            >
              {label}
            </span>
          )}

          <h1
            className={cn(
              "text-3xl font-black tracking-tight",
              "text-zinc-900 sm:text-4xl leading-[1.1]"
            )}
          >
            {title}
          </h1>

          <p className="text-base leading-relaxed text-zinc-500">
            {subtitle}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className={cn(
                    "inline-flex items-center gap-2",
                    "px-6 py-3 rounded-lg",
                    "bg-electronics text-white font-semibold",
                    "hover:bg-electronics-bar",
                    "shadow-lg shadow-electronics/20",
                    "motion-safe:transition-all duration-150",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-electronics"
                  )}
                >
                  {primaryCta.label}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className={cn(
                    "inline-flex items-center gap-2",
                    "px-6 py-3 rounded-lg",
                    "border border-zinc-300 text-zinc-700",
                    "hover:bg-zinc-100",
                    "motion-safe:transition-all duration-150",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-zinc-400"
                  )}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-5 pt-4 border-t border-zinc-200">
            {[
              { icon: ShieldCheck, text: "Certified Suppliers" },
              { icon: Zap, text: "Fast Fulfilment" },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 text-xs text-zinc-500"
              >
                <Icon size={13} className="text-electronics" aria-hidden />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

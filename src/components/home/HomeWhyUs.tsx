import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { FEATURES, TRUST_POINTS } from "@/lib/data/home";
import SectionHeader from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils/cn";

export default function HomeWhyUs() {
  return (
    <section
      aria-label="Why choose us"
      className="bg-zinc-50 py-24 px-6"
    >
      <div
        className={cn(
          "mx-auto max-w-6xl",
          "grid gap-16 lg:grid-cols-2 items-center"
        )}
      >
        {/* Left: real image with overlay */}
        <div className="relative h-[500px] rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85"
            alt="Modern office workspace and technology"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            aria-hidden
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-tr",
              "from-blue-950/80 via-blue-900/40 to-transparent"
            )}
          />

          {/* Floating stat cards */}
          <div
            className={cn(
              "absolute bottom-6 left-6 right-6",
              "grid grid-cols-2 gap-3"
            )}
          >
            {[
              { value: "500+", label: "Products" },
              { value: "98%", label: "Satisfaction" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className={cn(
                  "rounded-xl p-4 text-center",
                  "bg-white/10 backdrop-blur-md",
                  "border border-white/20"
                )}
              >
                <p className="text-2xl font-bold text-white">
                  {value}
                </p>
                <p className="text-xs text-white/70 mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: text + features */}
        <div className="space-y-10">
          <SectionHeader
            label="Why Depot Technologies"
            title="Built for businesses that can't afford to stop"
            subtitle={
              "Simple, reliable and scalable "
              + "material procurement for teams of all sizes."
            }
          />

          <div className="grid grid-cols-2 gap-4">
            {FEATURES.map(
              ({ icon: Icon, iconColor, iconBg, title, body }) => (
                <div
                  key={title}
                  className={cn(
                    "rounded-xl border border-zinc-200",
                    "bg-white p-5 space-y-3",
                    "hover:shadow-sm",
                    "motion-safe:transition-shadow duration-150"
                  )}
                >
                  <span
                    className={cn(
                      "flex w-fit p-2.5 rounded-lg",
                      iconBg
                    )}
                    aria-hidden
                  >
                    <Icon size={18} className={iconColor} />
                  </span>
                  <div className="space-y-1">
                    <p className="font-semibold text-sm text-zinc-900">
                      {title}
                    </p>
                    <p className="text-xs leading-relaxed text-zinc-500">
                      {body}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2.5">
                <CheckCircle2
                  size={15}
                  className="text-blue-600 shrink-0"
                  aria-hidden
                />
                <span className="text-sm text-zinc-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

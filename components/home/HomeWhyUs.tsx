import { CheckCircle2 } from "lucide-react";
import { FEATURES, TRUST_POINTS } from "@/lib/data/home";
import SectionHeader from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils/cn";

export default function HomeWhyUs() {
  return (
    <section
      aria-label="Why choose us"
      className="bg-white py-20 px-6"
    >
      <div
        className={cn(
          "mx-auto max-w-6xl",
          "grid gap-16 lg:grid-cols-2 items-center"
        )}
      >
        <div className="space-y-8">
          <SectionHeader
            label="Why Depot Technologies"
            title="Built for businesses that can't afford to stop"
            subtitle={
              "Simple, reliable and scalable "
              + "material procurement for teams of all sizes."
            }
          />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2.5">
                <CheckCircle2
                  size={16}
                  className="text-blue-600 shrink-0"
                  aria-hidden
                />
                <span className="text-sm text-zinc-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {FEATURES.map(
            ({ icon: Icon, iconColor, iconBg, title, body }) => (
              <div
                key={title}
                className={cn(
                  "rounded-xl border border-zinc-200",
                  "bg-zinc-50 p-5 space-y-3"
                )}
              >
                <span
                  className={cn("flex w-fit p-2.5 rounded-lg", iconBg)}
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
      </div>
    </section>
  );
}

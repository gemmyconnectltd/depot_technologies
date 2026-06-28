import { CONTACT_INFO } from "@/lib/data/contact";
import { cn } from "@/lib/utils/cn";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2
          className={cn(
            "text-xl font-bold tracking-tight text-zinc-900"
          )}
        >
          Get in touch
        </h2>
        <p className="text-sm leading-relaxed text-zinc-500">
          We're here to help with quotes, bulk orders,
          product questions and anything else you need.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CONTACT_INFO.map(
          ({ icon: Icon, iconColor, iconBg, label, value }) => (
            <div
              key={label}
              className={cn(
                "flex items-start gap-4 p-5",
                "rounded-xl border border-zinc-200 bg-white"
              )}
            >
              <span
                className={cn("p-2.5 rounded-lg shrink-0", iconBg)}
                aria-hidden
              >
                <Icon size={18} className={iconColor} />
              </span>
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-xs font-semibold uppercase",
                    "tracking-wider text-zinc-400 mb-0.5"
                  )}
                >
                  {label}
                </p>
                <p className="text-sm font-medium text-zinc-800 break-words">
                  {value}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

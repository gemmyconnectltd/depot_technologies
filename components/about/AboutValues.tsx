import { VALUES } from "@/lib/data/about";
import SectionHeader from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils/cn";

export default function AboutValues() {
  return (
    <section
      aria-label="Our values"
      className="bg-zinc-50 py-20 px-6"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionHeader
          label="Our Values"
          title="What we stand for"
          subtitle={
            "The principles that guide every decision "
            + "we make and every order we fulfil."
          }
          centered
        />
        <div
          className={cn(
            "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {VALUES.map(
            ({ icon: Icon, iconColor, iconBg, title, body }) => (
              <div
                key={title}
                className={cn(
                  "rounded-xl border border-zinc-200",
                  "bg-white p-6 space-y-4"
                )}
              >
                <span
                  className={cn(
                    "flex w-fit p-3 rounded-xl",
                    iconBg
                  )}
                  aria-hidden
                >
                  <Icon size={20} className={iconColor} />
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-zinc-900">
                    {title}
                  </h3>
                  <p
                    className={cn(
                      "text-sm leading-relaxed text-zinc-500"
                    )}
                  >
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

import { STATS } from "@/lib/data/home";
import { cn } from "@/lib/utils/cn";

export default function HomeStats() {
  return (
    <section
      aria-label="Key stats"
      className="bg-white border-y border-zinc-200"
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-6 py-12",
          "grid grid-cols-2 sm:grid-cols-4 divide-x divide-zinc-200"
        )}
      >
        {STATS.map(({ value, label, color }) => (
          <div
            key={label}
            className={cn(
              "flex flex-col items-center",
              "text-center px-6 py-4 gap-1"
            )}
          >
            <p
              className={cn(
                "text-4xl font-black tracking-tight",
                color
              )}
            >
              {value}
            </p>
            <p className="text-sm text-zinc-500 font-medium">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

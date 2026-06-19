import { STATS } from "@/lib/data/home";
import { cn } from "@/lib/utils/cn";

export default function HomeStats() {
  return (
    <section
      aria-label="Key stats"
      className="bg-white border-b border-zinc-200"
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-6 py-10",
          "grid grid-cols-2 gap-4 sm:grid-cols-4"
        )}
      >
        {STATS.map(({ value, label, color }) => (
          <div
            key={label}
            className={cn(
              "flex flex-col items-center text-center",
              "gap-1 p-4 rounded-xl",
              "border border-zinc-100 bg-zinc-50"
            )}
          >
            <p
              className={cn(
                "text-3xl font-bold tracking-tight",
                color
              )}
            >
              {value}
            </p>
            <p className="text-xs text-zinc-500 font-medium">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

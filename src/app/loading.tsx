import { cn } from "@/lib/utils/cn";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-zinc-200",
        className
      )}
    />
  );
}

export default function Loading() {
  return (
    <>
      <section
        aria-label="Loading"
        className={cn("bg-white border-b border-zinc-200")}
      >
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-10 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="hidden lg:flex gap-10">
            <div className="w-64 shrink-0 flex flex-col gap-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <div className="space-y-2">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-9 w-36" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-col rounded-2xl overflow-hidden",
                      "border border-zinc-200 bg-white"
                    )}
                  >
                    <Skeleton className="h-48 w-full rounded-none" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <div className="pt-3 border-t border-zinc-100 flex justify-between">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:hidden space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-9 w-36" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col rounded-2xl overflow-hidden",
                    "border border-zinc-200 bg-white"
                  )}
                >
                  <Skeleton className="h-48 w-full rounded-none" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="pt-3 border-t border-zinc-100 flex justify-between">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

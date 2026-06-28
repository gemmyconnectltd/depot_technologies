import type { Metadata } from "next";
import Link from "next/link";
import { Home, Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Depot Technologies",
  description:
    "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <section
      aria-label="Page not found"
      className={cn(
        "flex items-center justify-center",
        "min-h-[70vh] px-6"
      )}
    >
      <div className="text-center max-w-md">
        <div
          className={cn(
            "inline-flex items-center justify-center",
            "w-20 h-20 rounded-2xl",
            "bg-zinc-100 mb-8"
          )}
        >
          <Search size={36} className="text-zinc-400" />
        </div>

        <h1
          className={cn(
            "text-7xl font-black tracking-tight",
            "text-zinc-900 mb-4"
          )}
        >
          404
        </h1>

        <p
          className={cn(
            "text-lg font-semibold text-zinc-700 mb-2"
          )}
        >
          Page not found
        </p>

        <p className="text-sm text-zinc-500 leading-relaxed mb-10">
          The page you are looking for does not exist
          or has been moved. Try searching or go back home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-2",
              "px-6 py-3 rounded-lg text-sm font-semibold",
              "bg-electronics text-white",
              "hover:bg-electronics-bar",
              "shadow-lg shadow-electronics/20",
              "motion-safe:transition-all duration-150",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-electronics"
            )}
          >
            <Home size={16} aria-hidden />
            Back to Home
          </Link>
          <Link
            href="/search"
            className={cn(
              "inline-flex items-center gap-2",
              "px-6 py-3 rounded-lg text-sm font-semibold",
              "border border-zinc-300 text-zinc-700",
              "hover:bg-zinc-100",
              "motion-safe:transition-all duration-150",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-zinc-400"
            )}
          >
            <Search size={16} aria-hidden />
            Search Products
          </Link>
        </div>
      </div>
    </section>
  );
}

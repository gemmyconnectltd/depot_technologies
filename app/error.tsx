"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      aria-label="Error"
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
            "bg-red-50 mb-8"
          )}
        >
          <AlertTriangle size={36} className="text-red-500" />
        </div>

        <h1
          className={cn(
            "text-2xl font-bold tracking-tight",
            "text-zinc-900 mb-2"
          )}
        >
          Something went wrong
        </h1>

        <p className="text-sm text-zinc-500 leading-relaxed mb-2">
          {error.message || "An unexpected error occurred."}
        </p>

        {error.digest && (
          <p className="text-xs text-zinc-400 mb-8 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        {!error.digest && <div className="mb-8" />}

        <button
          onClick={() => unstable_retry()}
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
          <RefreshCw size={16} aria-hidden />
          Try Again
        </button>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

interface Props {
  orderId: string;
}

export default function CancelOrderButton({ orderId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCancel() {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Failed to cancel order");
      }

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        disabled={loading}
        onClick={handleCancel}
        className={cn(
          "inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold",
          "bg-red-600 text-white hover:bg-red-700",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "motion-safe:transition-colors duration-150"
        )}
      >
        {loading ? "Cancelling..." : "Cancel Order"}
      </button>
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

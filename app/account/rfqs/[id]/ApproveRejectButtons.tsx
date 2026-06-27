"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

interface Props {
  rfqId: string;
}

export default function ApproveRejectButtons({ rfqId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAction(action: "APPROVE" | "REJECT") {
    setLoading(action);
    setError(null);

    if (action === "REJECT") {
      if (!confirm("Are you sure you want to reject this quotation?")) {
        setLoading(null);
        return;
      }
    }

    try {
      const res = await fetch(`/api/rfqs/${rfqId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? `Failed to ${action.toLowerCase()} quotation`);
      }

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={loading !== null}
          onClick={() => handleAction("REJECT")}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold",
            "border border-red-300 text-red-700 hover:bg-red-50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "motion-safe:transition-colors duration-150"
          )}
        >
          {loading === "REJECT" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <XCircle size={16} />
          )}
          Reject
        </button>
        <button
          type="button"
          disabled={loading !== null}
          onClick={() => handleAction("APPROVE")}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold",
            "bg-emerald-600 text-white hover:bg-emerald-700",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "motion-safe:transition-colors duration-150"
          )}
        >
          {loading === "APPROVE" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <CheckCircle2 size={16} />
          )}
          Approve
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

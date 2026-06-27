"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Loader2,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/lib/types";

interface LineItem {
  productId: string;
  quantity: number;
  notes: string;
}

export default function NewRFQPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [items, setItems] = useState<LineItem[]>([
    { productId: "", quantity: 1, notes: "" },
  ]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        setProducts(json.data ?? []);
      } catch {
        setError("Failed to load products");
      } finally {
        setProductsLoading(false);
      }
    }
    load();
  }, []);

  function addItem() {
    setItems((prev) => [...prev, { productId: "", quantity: 1, notes: "" }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function updateItem(index: number, field: keyof LineItem, value: string | number) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  }

  function getProduct(id: string) {
    return products.find((p) => p.id === id);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const validItems = items.filter((i) => i.productId);
    if (validItems.length === 0) {
      setError("Add at least one product");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/rfqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: validItems.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            notes: i.notes || undefined,
          })),
          deliveryDate: deliveryDate || undefined,
          budget: budget ? Number(budget) : undefined,
          notes: notes || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to create RFQ");
        return;
      }

      router.push(`/account/rfqs/${data.data.id}`);
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => router.push("/account/rfqs")}
        className={cn(
          "inline-flex items-center gap-1.5 text-sm",
          "text-zinc-500 hover:text-zinc-900",
          "motion-safe:transition-colors duration-150"
        )}
      >
        <ArrowLeft size={16} />
        Back to RFQs
      </button>

      <h2 className="text-lg font-semibold text-zinc-900">New RFQ</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div
            className={cn(
              "rounded-lg border border-red-200 bg-red-50",
              "px-4 py-3 text-sm text-red-700"
            )}
          >
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
          <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-200">
            <h3 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
              <Package size={16} className="text-zinc-400" />
              Products
            </h3>
          </div>
          <div className="divide-y divide-zinc-100">
            {items.map((item, index) => (
              <div key={index} className="px-6 py-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <select
                      value={item.productId}
                      onChange={(e) =>
                        updateItem(index, "productId", e.target.value)
                      }
                      disabled={productsLoading}
                      className={cn(
                        "w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm",
                        "focus:outline-none focus:ring-2 focus:ring-electronics focus:border-transparent",
                        "motion-safe:transition-shadow duration-150"
                      )}
                    >
                      <option value="">
                        {productsLoading ? "Loading..." : "Select product"}
                      </option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — {p.sku}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, "quantity", Math.max(1, Number(e.target.value)))
                      }
                      className={cn(
                        "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-center",
                        "focus:outline-none focus:ring-2 focus:ring-electronics focus:border-transparent",
                        "motion-safe:transition-shadow duration-150"
                      )}
                    />
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="p-2 text-zinc-400 hover:text-red-600 motion-safe:transition-colors duration-150"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                {item.productId && getProduct(item.productId) && (
                  <p className="text-xs text-zinc-400">
                    {getProduct(item.productId)!.sku} &mdash;{" "}
                    RWF {Number(getProduct(item.productId)!.retailPrice).toLocaleString("en-RW")} ea
                    {getProduct(item.productId)!.bulkPrice && (
                      <span className="ml-2 text-emerald-600">
                        Bulk: RWF {Number(getProduct(item.productId)!.bulkPrice).toLocaleString("en-RW")} (min {getProduct(item.productId)!.bulkMinQty})
                      </span>
                    )}
                  </p>
                )}
                <textarea
                  placeholder="Item notes (optional)"
                  value={item.notes}
                  onChange={(e) => updateItem(index, "notes", e.target.value)}
                  rows={1}
                  className={cn(
                    "w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm",
                    "placeholder-zinc-400 resize-none",
                    "focus:outline-none focus:ring-2 focus:ring-electronics focus:border-transparent",
                    "motion-safe:transition-shadow duration-150"
                  )}
                />
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-zinc-100">
            <button
              type="button"
              onClick={addItem}
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-medium",
                "text-electronics hover:text-electronics-bar",
                "motion-safe:transition-colors duration-150"
              )}
            >
              <Plus size={16} />
              Add another product
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-4">
          <h3 className="text-sm font-semibold text-zinc-900">
            Details
          </h3>

          <div>
            <label
              htmlFor="deliveryDate"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              Preferred delivery date{" "}
              <span className="text-zinc-400 font-normal">(optional)</span>
            </label>
            <input
              id="deliveryDate"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className={cn(
                "w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-electronics focus:border-transparent",
                "motion-safe:transition-shadow duration-150"
              )}
            />
          </div>

          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              Budget (RWF){" "}
              <span className="text-zinc-400 font-normal">(optional)</span>
            </label>
            <input
              id="budget"
              type="number"
              min={0}
              step="0.01"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. 500000"
              className={cn(
                "w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-electronics focus:border-transparent",
                "motion-safe:transition-shadow duration-150"
              )}
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              Additional notes{" "}
              <span className="text-zinc-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requirements, delivery instructions, etc."
              className={cn(
                "w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm",
                "placeholder-zinc-400 resize-y min-h-[80px]",
                "focus:outline-none focus:ring-2 focus:ring-electronics focus:border-transparent",
                "motion-safe:transition-shadow duration-150"
              )}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <button
            type="button"
            onClick={() => router.push("/account/rfqs")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-semibold",
              "border border-zinc-300 text-zinc-700 hover:bg-zinc-50",
              "motion-safe:transition-colors duration-150"
            )}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "inline-flex items-center gap-2",
              "px-6 py-2 rounded-lg text-sm font-semibold text-white",
              "bg-electronics hover:bg-electronics-bar",
              "motion-safe:transition-colors duration-150",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit RFQ"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

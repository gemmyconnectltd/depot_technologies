"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

interface CartProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  retailPrice: number;
  stockStatus: string;
  image: string;
  imageAlt: string;
}

interface CartItemData {
  id: string;
  productId: string;
  quantity: number;
  product: CartProduct;
}

interface CartData {
  id: string | null;
  items: CartItemData[];
  total: number;
}

const TAX_RATE = 0.18;

function formatPrice(amount: number): string {
  return `RWF ${amount.toLocaleString("en-RW")}`;
}

export default function CartPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch("/api/cart");
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Failed to fetch cart");
      }
      const json = await res.json();
      setCart(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/cart");
      return;
    }
    if (status === "authenticated") {
      fetchCart();
    }
  }, [status, router, fetchCart]);

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      if (quantity < 0) return;
      try {
        const res = await fetch(`/api/cart/${productId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        });
        if (!res.ok) throw new Error("Failed to update");
        fetchCart();
      } catch {
        setError("Failed to update quantity");
      }
    },
    [fetchCart]
  );

  const removeItem = useCallback(
    async (productId: string) => {
      try {
        const res = await fetch(`/api/cart/${productId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to remove");
        fetchCart();
      } catch {
        setError("Failed to remove item");
      }
    },
    [fetchCart]
  );

  if (status === "loading" || loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 mb-6">
            <ShoppingCart size={28} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-zinc-500 mb-8">{error}</p>
          <Button onClick={fetchCart} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <section
        aria-label="Empty cart"
        className="bg-white border-b border-zinc-200"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-zinc-100 mb-6">
              <Package size={36} className="text-zinc-400" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">
              Your cart is empty
            </h1>
            <p className="text-sm text-zinc-500 max-w-sm mb-8">
              Looks like you haven&apos;t added anything yet.
              Browse our products and find something you need.
            </p>
            <Link
              href="/stationery"
              className={cn(
                "inline-flex items-center gap-2",
                "px-6 py-2.5 rounded-lg text-sm font-semibold",
                "bg-electronics text-white",
                "hover:bg-electronics-bar",
                "motion-safe:transition-colors duration-150"
              )}
            >
              Start Shopping
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const subtotal = cart.total;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = subtotal + tax;

  return (
    <>
      <section
        aria-label="Cart header"
        className="bg-white border-b border-zinc-200"
      >
        <div className="mx-auto max-w-6xl px-6 py-8 sm:py-12">
          <div className="flex items-center gap-3">
            <ShoppingCart size={24} className="text-zinc-900" />
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Shopping Cart
            </h1>
            <span className="text-sm text-zinc-400">
              ({cart.items.length} {cart.items.length === 1 ? "item" : "items"})
            </span>
          </div>
        </div>
      </section>

      <section
        aria-label="Cart items"
        className="bg-zinc-50 py-8 px-6"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex gap-4 sm:gap-6 p-4 sm:p-5",
                    "rounded-xl border border-zinc-200 bg-white"
                  )}
                >
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-zinc-50">
                    {item.product.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.imageAlt}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <Package size={24} className="text-zinc-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-sm font-semibold text-zinc-900 hover:text-electronics motion-safe:transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-zinc-500">
                      {formatPrice(item.product.retailPrice)} each
                    </p>
                    <p className="text-sm font-semibold text-zinc-900">
                      {formatPrice(item.product.retailPrice * item.quantity)}
                    </p>

                    <div className="flex items-center gap-3 mt-auto">
                      <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className={cn(
                            "p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50",
                            "motion-safe:transition-colors duration-150",
                            "disabled:opacity-30 disabled:cursor-not-allowed",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-electronics"
                          )}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-medium text-zinc-900 select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity + 1
                            )
                          }
                          aria-label="Increase quantity"
                          className={cn(
                            "p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50",
                            "motion-safe:transition-colors duration-150",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-electronics"
                          )}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        aria-label="Remove item"
                        className={cn(
                          "p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50",
                          "motion-safe:transition-colors duration-150",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                        )}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div
                className={cn(
                  "rounded-xl border border-zinc-200 bg-white p-6",
                  "sticky top-24"
                )}
              >
                <h2 className="text-lg font-semibold text-zinc-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between text-zinc-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-zinc-900">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-600">
                    <span>Tax (18% VAT)</span>
                    <span className="font-medium text-zinc-900">
                      {formatPrice(tax)}
                    </span>
                  </div>
                  <div className="border-t border-zinc-200 pt-3 flex items-center justify-between">
                    <span className="font-semibold text-zinc-900">Total</span>
                    <span className="text-lg font-bold text-zinc-900">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className={cn(
                    "mt-6 inline-flex items-center justify-center gap-2 w-full",
                    "px-6 py-2.5 rounded-lg text-sm font-semibold",
                    "bg-electronics text-white",
                    "hover:bg-electronics-bar",
                    "motion-safe:transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics focus-visible:ring-offset-2"
                  )}
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

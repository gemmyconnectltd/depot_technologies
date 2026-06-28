"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Building2,
  Landmark,
  Smartphone,
  MapPin,
  Check,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

interface Address {
  id: string;
  label: string | null;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  country: string;
  postalCode: string | null;
  isDefault: boolean;
}

interface CheckoutItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    slug: string;
    retailPrice: number;
    image: string;
    imageAlt: string;
  };
}

interface CartCheckoutData {
  id: string | null;
  items: CheckoutItem[];
  total: number;
}

const PAYMENT_METHODS = [
  { value: "CARD", label: "Card Payment", icon: CreditCard },
  { value: "MOBILE_MONEY", label: "Mobile Money", icon: Smartphone },
  { value: "INVOICE", label: "Invoice", icon: Building2 },
  { value: "BANK_TRANSFER", label: "Bank Transfer", icon: Landmark },
] as const;

const TAX_RATE = 0.18;

function formatPrice(amount: number): string {
  return `RWF ${amount.toLocaleString("en-RW")}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [cart, setCart] = useState<CartCheckoutData | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("CARD");
  const [placing, setPlacing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    label: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "Rwanda",
    postalCode: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const [addrRes, cartRes] = await Promise.all([
        fetch("/api/addresses"),
        fetch("/api/cart"),
      ]);

      if (!addrRes.ok || !cartRes.ok) {
        throw new Error("Failed to load checkout data");
      }

      const addrData = await addrRes.json();
      const cartData = await cartRes.json();

      setAddresses(addrData.data ?? []);
      setCart(cartData.data);

      const defaultAddr = addrData.data?.find(
        (a: Address) => a.isDefault
      );
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
      } else if (addrData.data?.length > 0) {
        setSelectedAddressId(addrData.data[0].id);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load checkout"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setError("Please select a delivery address");
      return;
    }

    setPlacing(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addressId: selectedAddressId,
          paymentMethod,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Failed to place order");
      }

      router.push(`/account/orders/${json.data.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to place order"
      );
      setPlacing(false);
    }
  };

  const handleSaveAddress = async () => {
    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...addressForm,
          isDefault: addresses.length === 0,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Failed to save address");
      }

      setShowAddressForm(false);
      setAddressForm({
        label: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        country: "Rwanda",
        postalCode: "",
      });
      fetchData();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save address"
      );
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-100 mb-6">
            <CreditCard size={28} className="text-zinc-400" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-sm text-zinc-500 mb-8">
            Add some items before checking out.
          </p>
          <Button onClick={() => router.push("/cart")} variant="primary">
            Go to Cart
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = cart.total;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = subtotal + tax;

  return (
    <>
      <section
        aria-label="Checkout header"
        className="bg-white border-b border-zinc-200"
      >
        <div className="mx-auto max-w-6xl px-6 py-8 sm:py-12">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/cart")}
              aria-label="Back to cart"
              className={cn(
                "p-2 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100",
                "motion-safe:transition-colors duration-150"
              )}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Checkout
            </h1>
          </div>
        </div>
      </section>

      <section
        aria-label="Checkout form"
        className="bg-zinc-50 py-8 px-6"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {error && (
                <div
                  className={cn(
                    "p-4 rounded-lg bg-red-50 border border-red-200",
                    "text-sm text-red-700"
                  )}
                  role="alert"
                >
                  {error}
                </div>
              )}

              <div
                className={cn(
                  "rounded-xl border border-zinc-200 bg-white p-6"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                    <MapPin size={18} className="text-zinc-400" />
                    Delivery Address
                  </h2>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className={cn(
                      "text-sm font-medium text-electronics",
                      "hover:text-electronics-bar",
                      "motion-safe:transition-colors duration-150"
                    )}
                  >
                    {showAddressForm ? "Cancel" : "Add New"}
                  </button>
                </div>

                {showAddressForm && (
                  <div className="space-y-4 mb-6 p-4 rounded-lg bg-zinc-50 border border-zinc-200">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-zinc-700">
                          Label
                        </label>
                        <input
                          value={addressForm.label}
                          onChange={(e) =>
                            setAddressForm((prev) => ({
                              ...prev,
                              label: e.target.value,
                            }))
                          }
                          placeholder="e.g. Home, Office"
                          className={cn(
                            "w-full px-4 py-2 text-sm rounded-lg border border-zinc-300 bg-white",
                            "text-zinc-900 placeholder:text-zinc-400",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics"
                          )}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-zinc-700">
                          Country
                        </label>
                        <input
                          value={addressForm.country}
                          onChange={(e) =>
                            setAddressForm((prev) => ({
                              ...prev,
                              country: e.target.value,
                            }))
                          }
                          className={cn(
                            "w-full px-4 py-2 text-sm rounded-lg border border-zinc-300 bg-white",
                            "text-zinc-900 placeholder:text-zinc-400",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics"
                          )}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-zinc-700">
                        Address Line 1
                      </label>
                      <input
                        value={addressForm.line1}
                        onChange={(e) =>
                          setAddressForm((prev) => ({
                            ...prev,
                            line1: e.target.value,
                          }))
                        }
                        placeholder="Street address, P.O. box"
                        className={cn(
                          "w-full px-4 py-2 text-sm rounded-lg border border-zinc-300 bg-white",
                          "text-zinc-900 placeholder:text-zinc-400",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics"
                        )}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-zinc-700">
                        Address Line 2
                      </label>
                      <input
                        value={addressForm.line2}
                        onChange={(e) =>
                          setAddressForm((prev) => ({
                            ...prev,
                            line2: e.target.value,
                          }))
                        }
                        placeholder="Apt, suite, unit (optional)"
                        className={cn(
                          "w-full px-4 py-2 text-sm rounded-lg border border-zinc-300 bg-white",
                          "text-zinc-900 placeholder:text-zinc-400",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics"
                        )}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-zinc-700">
                          City
                        </label>
                        <input
                          value={addressForm.city}
                          onChange={(e) =>
                            setAddressForm((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          }
                          placeholder="City"
                          className={cn(
                            "w-full px-4 py-2 text-sm rounded-lg border border-zinc-300 bg-white",
                            "text-zinc-900 placeholder:text-zinc-400",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics"
                          )}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-zinc-700">
                          State
                        </label>
                        <input
                          value={addressForm.state}
                          onChange={(e) =>
                            setAddressForm((prev) => ({
                              ...prev,
                              state: e.target.value,
                            }))
                          }
                          placeholder="State (optional)"
                          className={cn(
                            "w-full px-4 py-2 text-sm rounded-lg border border-zinc-300 bg-white",
                            "text-zinc-900 placeholder:text-zinc-400",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics"
                          )}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-zinc-700">
                          Postal Code
                        </label>
                        <input
                          value={addressForm.postalCode}
                          onChange={(e) =>
                            setAddressForm((prev) => ({
                              ...prev,
                              postalCode: e.target.value,
                            }))
                          }
                          placeholder="Postal code"
                          className={cn(
                            "w-full px-4 py-2 text-sm rounded-lg border border-zinc-300 bg-white",
                            "text-zinc-900 placeholder:text-zinc-400",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics"
                          )}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleSaveAddress}
                      disabled={
                        !addressForm.line1 || !addressForm.city
                      }
                      size="sm"
                    >
                      Save Address
                    </Button>
                  </div>
                )}

                {addresses.length === 0 && !showAddressForm && (
                  <p className="text-sm text-zinc-500">
                    No saved addresses. Click &ldquo;Add New&rdquo; to
                    enter a delivery address.
                  </p>
                )}

                <div className="space-y-2">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg border cursor-pointer",
                        "motion-safe:transition-colors duration-150",
                        selectedAddressId === addr.id
                          ? "border-electronics bg-electronics-light"
                          : "border-zinc-200 hover:border-zinc-300"
                      )}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={addr.id}
                        checked={selectedAddressId === addr.id}
                        onChange={() =>
                          setSelectedAddressId(addr.id)
                        }
                        className="mt-1 accent-electronics"
                      />
                      <div className="text-sm">
                        <p className="font-medium text-zinc-900">
                          {addr.label ?? "Address"}
                          {addr.isDefault && (
                            <span className="ml-2 text-xs text-zinc-400 font-normal">
                              (Default)
                            </span>
                          )}
                        </p>
                        <p className="text-zinc-500">
                          {addr.line1}
                          {addr.line2 ? `, ${addr.line2}` : ""}
                        </p>
                        <p className="text-zinc-500">
                          {addr.city}
                          {addr.state ? `, ${addr.state}` : ""}
                          {addr.postalCode
                            ? `, ${addr.postalCode}`
                            : ""}
                        </p>
                        <p className="text-zinc-500">{addr.country}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div
                className={cn(
                  "rounded-xl border border-zinc-200 bg-white p-6"
                )}
              >
                <h2 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                  <CreditCard size={18} className="text-zinc-400" />
                  Payment Method
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => (
                    <label
                      key={value}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-lg border cursor-pointer",
                        "motion-safe:transition-colors duration-150",
                        paymentMethod === value
                          ? "border-electronics bg-electronics-light"
                          : "border-zinc-200 hover:border-zinc-300"
                      )}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={value}
                        checked={paymentMethod === value}
                        onChange={() => setPaymentMethod(value)}
                        className="accent-electronics"
                      />
                      <Icon
                        size={20}
                        className={cn(
                          "shrink-0",
                          paymentMethod === value
                            ? "text-electronics"
                            : "text-zinc-400"
                        )}
                      />
                      <span className="text-sm font-medium text-zinc-900">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
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

                <div className="space-y-3 mb-4">
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-zinc-600 truncate mr-2">
                        {item.product.name}
                        <span className="text-zinc-400">
                          {" "}
                          x{item.quantity}
                        </span>
                      </span>
                      <span className="font-medium text-zinc-900 shrink-0">
                        {formatPrice(
                          item.product.retailPrice * item.quantity
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-200 pt-3 space-y-2 text-sm">
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
                  <div className="border-t border-zinc-200 pt-2 flex items-center justify-between">
                    <span className="font-semibold text-zinc-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-zinc-900">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  isLoading={placing}
                  disabled={placing || !selectedAddressId}
                  className="mt-6 w-full"
                  size="lg"
                >
                  {placing ? "Placing Order..." : "Place Order"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

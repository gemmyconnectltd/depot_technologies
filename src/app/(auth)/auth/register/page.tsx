"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    orgName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      router.push("/auth/login?success=Account created successfully");
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Create an account
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Join Depot Technologies today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-700 mb-1.5"
          >
            Full name
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={cn(
                "w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4",
                "text-sm text-zinc-900 placeholder-zinc-400",
                "focus:outline-none focus:ring-2 focus:ring-electronics focus:border-transparent",
                "motion-safe:transition-shadow duration-150"
              )}
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700 mb-1.5"
          >
            Email
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={cn(
                "w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4",
                "text-sm text-zinc-900 placeholder-zinc-400",
                "focus:outline-none focus:ring-2 focus:ring-electronics focus:border-transparent",
                "motion-safe:transition-shadow duration-150"
              )}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-700 mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              className={cn(
                "w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-10",
                "text-sm text-zinc-900 placeholder-zinc-400",
                "focus:outline-none focus:ring-2 focus:ring-electronics focus:border-transparent",
                "motion-safe:transition-shadow duration-150"
              )}
              placeholder="At least 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-zinc-700 mb-1.5"
          >
            Phone number{" "}
            <span className="text-zinc-400 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <Phone
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={cn(
                "w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4",
                "text-sm text-zinc-900 placeholder-zinc-400",
                "focus:outline-none focus:ring-2 focus:ring-electronics focus:border-transparent",
                "motion-safe:transition-shadow duration-150"
              )}
              placeholder="+233 50 000 0000"
            />
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-5">
          <p className="text-sm font-medium text-zinc-700 mb-1">
            Register a company{" "}
            <span className="text-zinc-400 font-normal">(optional)</span>
          </p>
          <p className="text-xs text-zinc-400 mb-3">
            Create an organisation account for B2B procurement and bulk
            ordering.
          </p>
          <div>
            <label
              htmlFor="orgName"
              className="block text-sm font-medium text-zinc-700 mb-1.5"
            >
              Organisation name
            </label>
            <div className="relative">
              <Building2
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                id="orgName"
                type="text"
                value={form.orgName}
                onChange={(e) => updateField("orgName", e.target.value)}
                className={cn(
                  "w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4",
                  "text-sm text-zinc-900 placeholder-zinc-400",
                  "focus:outline-none focus:ring-2 focus:ring-electronics focus:border-transparent",
                  "motion-safe:transition-shadow duration-150"
                )}
                placeholder="Acme Corp Ltd"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full rounded-lg py-2.5 text-sm font-semibold text-white",
            "bg-electronics hover:bg-electronics-bar",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electronics",
            "motion-safe:transition-colors duration-150",
            loading && "opacity-60 cursor-not-allowed"
          )}
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-electronics hover:text-electronics-bar motion-safe:transition-colors duration-150"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

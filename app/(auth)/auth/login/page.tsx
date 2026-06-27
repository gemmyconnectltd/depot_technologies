"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const errorParam = searchParams.get("error");
  const oauthError = useMemo(() => {
    if (!errorParam) return "";
    const map: Record<string, string> = {
      CredentialsSignin: "Invalid email or password",
      OAuthAccountNotLinked:
        "This email is already associated with another account",
    };
    return map[errorParam] || "An error occurred during sign in";
  }, [errorParam]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {(error || oauthError) && (
          <div
            className={cn(
              "rounded-lg border border-red-200 bg-red-50",
              "px-4 py-3 text-sm text-red-700"
            )}
          >
            {error || oauthError}
          </div>
        )}

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
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
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
              autoComplete="current-password"
              required
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              className={cn(
                "w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-10",
                "text-sm text-zinc-900 placeholder-zinc-400",
                "focus:outline-none focus:ring-2 focus:ring-electronics focus:border-transparent",
                "motion-safe:transition-shadow duration-150"
              )}
              placeholder="Enter your password"
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
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-semibold text-electronics hover:text-electronics-bar motion-safe:transition-colors duration-150"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}

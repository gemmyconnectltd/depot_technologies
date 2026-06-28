"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import SearchBar from "@/components/shared/SearchBar";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) {
      setCartCount(0);
      return;
    }
    fetch("/api/cart")
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        if (json?.data?.items) {
          setCartCount(json.data.items.length);
        }
      })
      .catch(() => {});
  }, [session]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-white border-b border-zinc-200"
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-16 max-w-6xl",
          "items-center justify-between px-6"
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Depot Technologies home"
        >
          <div
            className={cn(
              "flex items-center justify-center",
              "w-9 h-9 rounded-xl bg-zinc-50",
              "border border-zinc-200 shadow-sm"
            )}
          >
            <Image
              src="/logo.png"
              alt="Depot Technologies logo"
              width={26}
              height={26}
              priority
            />
          </div>
          <span
            className={cn(
              "text-sm font-bold tracking-tight text-zinc-900"
            )}
          >
            Depot Technologies
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1"
        >
          {LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium",
                  "motion-safe:transition-colors duration-150",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-electronics",
                  active
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <SearchBar />
          {session?.user ? (
            <>
              <Link
                href="/cart"
                aria-label={`Shopping cart with ${cartCount} items`}
                className={cn(
                  "relative flex items-center justify-center",
                  "w-9 h-9 rounded-lg text-zinc-500",
                  "hover:text-zinc-900 hover:bg-zinc-50",
                  "motion-safe:transition-colors duration-150",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-electronics"
                )}
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span
                    className={cn(
                      "absolute -top-1 -right-1",
                      "flex items-center justify-center",
                      "min-w-[18px] h-[18px] px-1",
                      "rounded-full bg-electronics text-white",
                      "text-[10px] font-bold leading-none"
                    )}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/account"
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg",
                  "text-sm font-medium text-zinc-500",
                  "hover:text-zinc-900 hover:bg-zinc-50",
                  "motion-safe:transition-colors duration-150",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-electronics"
                )}
              >
                <User size={16} />
                {session.user.name}
              </Link>
              <button
                onClick={() => signOut()}
                className={cn(
                  "text-sm font-medium text-zinc-400",
                  "hover:text-zinc-700",
                  "motion-safe:transition-colors duration-150"
                )}
              >
                Sign out
              </button>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center",
                  "px-4 py-2 rounded-lg text-sm font-semibold",
                  "bg-zinc-100 text-zinc-700",
                  "hover:bg-zinc-200",
                  "motion-safe:transition-colors duration-150",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-electronics"
                )}
              >
                Get in Touch
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={cn(
                  "inline-flex items-center",
                  "px-4 py-2 rounded-lg text-sm font-semibold",
                  "bg-electronics text-white",
                  "hover:bg-electronics-bar",
                  "motion-safe:transition-colors duration-150",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-electronics"
                )}
              >
                Sign in
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center",
                  "px-4 py-2 rounded-lg text-sm font-semibold",
                  "bg-electronics text-white",
                  "hover:bg-electronics-bar",
                  "motion-safe:transition-colors duration-150",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-electronics"
                )}
              >
                Get in Touch
              </Link>
            </>
          )}
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "md:hidden p-2 rounded-md",
            "text-zinc-500 hover:text-zinc-900",
            "motion-safe:transition-colors duration-150"
          )}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile navigation"
          className={cn(
            "md:hidden border-t border-zinc-200",
            "bg-white px-6 py-4 space-y-1"
          )}
        >
          {LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block px-3 py-2 rounded-lg text-sm font-medium",
                  "motion-safe:transition-colors duration-150",
                  active
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                {label}
              </Link>
            );
          })}
          {session?.user ? (
            <>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium",
                  "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                <ShoppingCart size={16} />
                Cart
                {cartCount > 0 && (
                  <span className="ml-auto text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium",
                  "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                <User size={16} />
                {session.user.name}
              </Link>
              <button
                onClick={() => { setOpen(false); signOut(); }}
                className={cn(
                  "block w-full text-left px-3 py-2 rounded-lg text-sm font-medium",
                  "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className={cn(
                "block mt-3 px-4 py-2.5 rounded-lg text-center",
                "bg-electronics text-white text-sm font-semibold",
                "hover:bg-electronics-bar",
                "motion-safe:transition-colors duration-150"
              )}
            >
              Sign in
            </Link>
          )}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={cn(
              "block mt-3 px-4 py-2.5 rounded-lg text-center",
              "bg-zinc-100 text-zinc-700 text-sm font-semibold",
              "hover:bg-zinc-200",
              "motion-safe:transition-colors duration-150"
            )}
          >
            Get in Touch
          </Link>
        </nav>
      )}
    </header>
  );
}

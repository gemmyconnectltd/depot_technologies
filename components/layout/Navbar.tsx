"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Stationery", href: "/stationery" },
  { label: "Electronics", href: "/electronics" },
  { label: "Software", href: "/software" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "border-b border-zinc-200",
        "bg-white/95 backdrop-blur-sm"
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-16 max-w-6xl",
          "items-center justify-between px-6"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Depot Technologies home"
        >
          <span
            className={cn(
              "flex items-center justify-center",
              "w-9 h-9 rounded-lg bg-white",
              "border border-zinc-200 shadow-sm"
            )}
          >
            <Image
              src="/logo.png"
              alt="Depot Technologies logo"
              width={28}
              height={28}
              priority
            />
          </span>
          <span
            className={cn(
              "text-sm font-semibold tracking-tight",
              "text-zinc-900"
            )}
          >
            Depot Technologies
          </span>
        </Link>

        {/* Desktop nav */}
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
                  "px-3 py-1.5 rounded-md",
                  "text-sm font-medium",
                  "motion-safe:transition-colors duration-150",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-zinc-900",
                  active
                    ? "text-zinc-900 bg-zinc-100"
                    : "text-zinc-500 hover:text-zinc-900"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className={cn(
            "hidden md:inline-flex items-center",
            "px-4 py-2 rounded-lg",
            "bg-zinc-900 text-white text-sm font-medium",
            "hover:bg-zinc-700",
            "motion-safe:transition-colors duration-150",
            "focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-zinc-900"
          )}
        >
          Get in Touch
        </Link>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "md:hidden p-2 rounded-md",
            "text-zinc-600 hover:text-zinc-900",
            "motion-safe:transition-colors duration-150",
            "focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-zinc-900"
          )}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
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
                  "block px-3 py-2 rounded-md",
                  "text-sm font-medium",
                  "motion-safe:transition-colors duration-150",
                  active
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={cn(
              "block mt-3 px-4 py-2 rounded-lg text-center",
              "bg-zinc-900 text-white text-sm font-medium",
              "hover:bg-zinc-700",
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

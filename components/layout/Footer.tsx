import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

const LINKS = {
  Products: [
    { label: "Stationery", href: "/stationery" },
    { label: "Electronics", href: "/electronics" },
    { label: "Software & Projects", href: "/software" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div
        className={cn(
          "mx-auto max-w-6xl px-6 py-12",
          "grid grid-cols-1 gap-10 sm:grid-cols-3"
        )}
      >
        {/* Brand */}
        <div className="space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Depot Technologies home"
          >
            <span
              className={cn(
                "flex items-center justify-center",
                "w-8 h-8 rounded-lg bg-white",
                "border border-zinc-200 shadow-sm"
              )}
            >
              <Image
                src="/logo.png"
                alt="Depot Technologies logo"
                width={24}
                height={24}
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
          <p
            className={cn(
              "text-sm leading-relaxed text-zinc-500"
            )}
          >
            Your trusted partner for quality materials —
            stationery, electronics, and software solutions.
          </p>
        </div>

        {/* Link groups */}
        {Object.entries(LINKS).map(([group, items]) => (
          <div key={group}>
            <p
              className={cn(
                "mb-3 text-xs font-semibold",
                "uppercase tracking-wider text-zinc-400"
              )}
            >
              {group}
            </p>
            <ul className="space-y-2">
              {items.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "text-sm text-zinc-500",
                      "hover:text-zinc-900",
                      "motion-safe:transition-colors duration-150"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-200 px-6 py-4">
        <p className="text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} Depot Technologies.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

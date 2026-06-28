"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  MapPin,
  User,
  FileText,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/account", icon: LayoutDashboard },
  { label: "Orders", href: "/account/orders", icon: ShoppingBag },
  { label: "RFQs", href: "/account/rfqs", icon: FileText },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Profile", href: "/account/profile", icon: User },
] as const;

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-8">
        My Account
      </h1>
      <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
        <nav
          aria-label="Account navigation"
          className="flex lg:flex-col gap-1 lg:sticky lg:top-24 lg:self-start overflow-x-auto pb-2 lg:pb-0"
        >
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/account"
                ? pathname === href
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap",
                  "motion-safe:transition-colors duration-150",
                  active
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                )}
              >
                <Icon size={18} className="shrink-0 text-zinc-400" />
                <span className="hidden lg:inline">{label}</span>
                <ChevronRight
                  size={14}
                  className="ml-auto hidden lg:block text-zinc-300"
                />
              </Link>
            );
          })}
        </nav>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

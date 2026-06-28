import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

function statusVariant(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-amber-100 text-amber-800";
    case "CONFIRMED":
    case "PROCESSING":
    case "SHIPPED":
      return "bg-blue-100 text-blue-800";
    case "DELIVERED":
      return "bg-emerald-100 text-emerald-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-zinc-100 text-zinc-700";
  }
}

function formatPrice(amount: number): string {
  return `RWF ${amount.toLocaleString("en-RW")}`;
}

function formatDate(iso: Date): string {
  return new Intl.DateTimeFormat("en-RW", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(iso);
}

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const [orderCount, recentOrders] = await Promise.all([
    prisma.order.count({ where: { userId: session.user.id } }),
    prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-zinc-900 mb-1">
          Welcome back, {session.user.name}
        </h2>
        <p className="text-sm text-zinc-500">{session.user.email}</p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            Recent Orders
          </h2>
          {orderCount > 0 && (
            <Link
              href="/account/orders"
              className="text-sm font-medium text-electronics hover:text-electronics-bar motion-safe:transition-colors"
            >
              View all
            </Link>
          )}
        </div>

        {orderCount === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-100 mb-4">
              <ShoppingBag size={24} className="text-zinc-400" />
            </div>
            <p className="text-sm text-zinc-500 mb-4">
              You haven&apos;t placed any orders yet.
            </p>
            <Link
              href="/"
              className={cn(
                "inline-flex items-center gap-1.5",
                "px-4 py-2 rounded-lg text-sm font-semibold",
                "bg-electronics text-white hover:bg-electronics-bar",
                "motion-safe:transition-colors duration-150"
              )}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className={cn(
                  "flex items-center justify-between gap-4",
                  "p-4 rounded-xl border border-zinc-100",
                  "hover:border-zinc-200 hover:bg-zinc-50",
                  "motion-safe:transition-colors duration-150"
                )}
              >
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-medium text-zinc-900 truncate">
                    {order.orderNumber}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span
                    className={cn(
                      "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium",
                      statusVariant(order.status)
                    )}
                  >
                    {order.status}
                  </span>
                  <span className="text-sm font-semibold text-zinc-900">
                    {formatPrice(Number(order.total))}
                  </span>
                  <ChevronRight size={16} className="text-zinc-300" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

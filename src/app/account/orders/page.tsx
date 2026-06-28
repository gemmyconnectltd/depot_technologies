import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const PAGE_SIZE = 10;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

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

export default async function OrdersPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const sp = await searchParams;
  const currentPage = Math.max(1, Number(sp.page) || 1);
  const skip = (currentPage - 1) * PAGE_SIZE;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip,
    }),
    prisma.order.count({ where: { userId: session.user.id } }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900">Order History</h2>
        <p className="text-sm text-zinc-500 mt-1">
          {total} {total === 1 ? "order" : "orders"} placed
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center rounded-2xl border border-zinc-200 bg-white">
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
        <>
          <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
            <div className="hidden sm:grid sm:grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3 bg-zinc-50 border-b border-zinc-200 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <span>Order</span>
              <span>Date</span>
              <span>Status</span>
              <span>Total</span>
            </div>
            <div className="divide-y divide-zinc-100">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id}`}
                  className={cn(
                    "grid sm:grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-4",
                    "items-center motion-safe:transition-colors duration-150",
                    "hover:bg-zinc-50"
                  )}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-900 truncate">
                      {order.orderNumber}
                    </p>
                    <p className="text-xs text-zinc-400 sm:hidden mt-1">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <p className="hidden sm:block text-sm text-zinc-500">
                    {formatDate(order.createdAt)}
                  </p>
                  <span
                    className={cn(
                      "inline-flex justify-self-start px-2.5 py-0.5 rounded-full text-xs font-medium",
                      statusVariant(order.status)
                    )}
                  >
                    {order.status}
                  </span>
                  <div className="flex items-center gap-3 justify-self-end">
                    <span className="text-sm font-semibold text-zinc-900">
                      {formatPrice(Number(order.total))}
                    </span>
                    <ChevronRight size={16} className="text-zinc-300 shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Link
                    key={page}
                    href={`/account/orders?page=${page}`}
                    className={cn(
                      "inline-flex items-center justify-center",
                      "w-9 h-9 rounded-lg text-sm font-medium",
                      "motion-safe:transition-colors duration-150",
                      page === currentPage
                        ? "bg-electronics text-white"
                        : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
                    )}
                  >
                    {page}
                  </Link>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

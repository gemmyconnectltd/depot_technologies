import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import {
  ArrowLeft,
  Package,
  Clock,
  CreditCard,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import CancelOrderButton from "./CancelOrderButton";

interface Props {
  params: Promise<{ id: string }>;
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
    hour: "2-digit",
    minute: "2-digit",
  }).format(iso);
}

function paymentMethodLabel(method: string) {
  switch (method) {
    case "CARD":
      return "Card";
    case "MOBILE_MONEY":
      return "Mobile Money";
    case "INVOICE":
      return "Invoice";
    case "BANK_TRANSFER":
      return "Bank Transfer";
    default:
      return method;
  }
}

function paymentStatusVariant(status: string) {
  switch (status) {
    case "PAID":
      return "bg-emerald-100 text-emerald-800";
    case "PENDING":
      return "bg-amber-100 text-amber-800";
    case "FAILED":
      return "bg-red-100 text-red-800";
    case "REFUNDED":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-zinc-100 text-zinc-700";
  }
}

export default async function OrderDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const { id } = await params;

  const order = await prisma.order.findFirst({
    where: { id, userId: session.user.id },
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
      payment: true,
      address: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/account/orders"
        className={cn(
          "inline-flex items-center gap-1.5 text-sm",
          "text-zinc-500 hover:text-zinc-900",
          "motion-safe:transition-colors duration-150"
        )}
      >
        <ArrowLeft size={16} />
        Back to Orders
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            {order.orderNumber}
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-flex px-3 py-1 rounded-full text-sm font-medium",
              statusVariant(order.status)
            )}
          >
            {order.status}
          </span>
          {order.status === "PENDING" && (
            <CancelOrderButton orderId={order.id} />
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <Clock size={20} className="text-zinc-400" />
          <div>
            <p className="text-sm font-medium text-zinc-900">
              Estimated Delivery
            </p>
            <p className="text-sm text-zinc-500">
              {new Date(
                new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("en-RW", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
        <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-200">
          <h3 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
            <Package size={16} className="text-zinc-400" />
            Items
          </h3>
        </div>
        <div className="divide-y divide-zinc-100">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 px-6 py-4"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                {item.product.images[0] ? (
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.images[0].alt ?? item.product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-zinc-300">
                    <Package size={24} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 truncate">
                  {item.product.name}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Qty: {item.quantity} &times; {formatPrice(Number(item.unitPrice))}
                </p>
              </div>
              <p className="text-sm font-semibold text-zinc-900 shrink-0">
                {formatPrice(Number(item.totalPrice))}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-200 px-6 py-4 space-y-2 bg-zinc-50">
          <div className="flex justify-between text-sm text-zinc-600">
            <span>Subtotal</span>
            <span>{formatPrice(Number(order.subtotal))}</span>
          </div>
          <div className="flex justify-between text-sm text-zinc-600">
            <span>Tax (18%)</span>
            <span>{formatPrice(Number(order.tax))}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-zinc-900 pt-2 border-t border-zinc-200">
            <span>Total</span>
            <span>{formatPrice(Number(order.total))}</span>
          </div>
        </div>
      </div>

      {order.payment && (
        <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
          <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-200">
            <h3 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
              <CreditCard size={16} className="text-zinc-400" />
              Payment
            </h3>
          </div>
          <div className="px-6 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Method</span>
              <span className="font-medium text-zinc-900">
                {paymentMethodLabel(order.payment.method)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Status</span>
              <span
                className={cn(
                  "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
                  paymentStatusVariant(order.payment.status)
                )}
              >
                {order.payment.status}
              </span>
            </div>
            {order.payment.reference && (
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Reference</span>
                <span className="font-mono text-xs text-zinc-900">
                  {order.payment.reference}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {order.address && (
        <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
          <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-200">
            <h3 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
              <MapPin size={16} className="text-zinc-400" />
              Delivery Address
            </h3>
          </div>
          <div className="px-6 py-4 text-sm text-zinc-700 space-y-1">
            {order.address.label && (
              <p className="font-medium text-zinc-900">
                {order.address.label}
              </p>
            )}
            <p>{order.address.line1}</p>
            {order.address.line2 && <p>{order.address.line2}</p>}
            <p>
              {order.address.city}
              {order.address.state ? `, ${order.address.state}` : ""}
            </p>
            <p>
              {order.address.country}
              {order.address.postalCode
                ? ` — ${order.address.postalCode}`
                : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

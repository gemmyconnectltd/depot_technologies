import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import {
  ArrowLeft,
  FileText,
  Package,
  Calendar,
  Wallet,
  Building2,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import ApproveRejectButtons from "./ApproveRejectButtons";

interface Props {
  params: Promise<{ id: string }>;
}

const STATUS_STEPS = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "QUOTED",
  "APPROVED",
  "ORDERED",
  "FULFILLED",
] as const;

const STATUS_LABELS: Record<string, string> = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  QUOTED: "Quoted",
  APPROVED: "Approved",
  ORDERED: "Ordered",
  FULFILLED: "Fulfilled",
  REJECTED: "Rejected",
};

const STATUS_VARIANTS: Record<string, string> = {
  SUBMITTED: "bg-amber-100 text-amber-800",
  UNDER_REVIEW: "bg-blue-100 text-blue-800",
  QUOTED: "bg-violet-100 text-violet-800",
  APPROVED: "bg-emerald-100 text-emerald-800",
  ORDERED: "bg-sky-100 text-sky-800",
  FULFILLED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-red-100 text-red-800",
};

function statusVariant(status: string) {
  return STATUS_VARIANTS[status] ?? "bg-zinc-100 text-zinc-700";
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

function currentStepIndex(status: string): number {
  const idx = STATUS_STEPS.indexOf(status as typeof STATUS_STEPS[number]);
  return idx >= 0 ? idx : -1;
}

function isRejected(status: string): boolean {
  return status === "REJECTED";
}

export default async function RFQDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const { id } = await params;

  const orgMember = await prisma.orgMember.findUnique({
    where: { userId: session.user.id },
    include: {
      organisation: {
        select: { id: true, name: true },
      },
    },
  });

  if (!orgMember) {
    notFound();
  }

  const rfq = await prisma.rFQ.findFirst({
    where: { id, organisationId: orgMember.organisation.id },
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
      quotation: true,
      user: {
        select: { name: true, email: true },
      },
    },
  });

  if (!rfq) {
    notFound();
  }

  const stepIdx = currentStepIndex(rfq.status);
  const rejected = isRejected(rfq.status);
  const canRespond = rfq.status === "QUOTED" && orgMember.role === "ORG_ADMIN";

  return (
    <div className="space-y-6">
      <Link
        href="/account/rfqs"
        className={cn(
          "inline-flex items-center gap-1.5 text-sm",
          "text-zinc-500 hover:text-zinc-900",
          "motion-safe:transition-colors duration-150"
        )}
      >
        <ArrowLeft size={16} />
        Back to RFQs
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            {rfq.rfqNumber}
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Submitted by {rfq.user.name} on {formatDate(rfq.createdAt)}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex self-start px-3 py-1 rounded-full text-sm font-medium",
            statusVariant(rfq.status)
          )}
        >
          {STATUS_LABELS[rfq.status] ?? rfq.status}
        </span>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-zinc-900 mb-4 flex items-center gap-2">
          <Building2 size={16} className="text-zinc-400" />
          {orgMember.organisation.name}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          {rfq.deliveryDate && (
            <div className="flex items-center gap-2 text-zinc-600">
              <Calendar size={14} className="text-zinc-400" />
              <span>
                Delivery by {formatDate(rfq.deliveryDate)}
              </span>
            </div>
          )}
          {rfq.budget && (
            <div className="flex items-center gap-2 text-zinc-600">
              <Wallet size={14} className="text-zinc-400" />
              <span>Budget: {formatPrice(Number(rfq.budget))}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-zinc-600">
            <FileText size={14} className="text-zinc-400" />
            <span>
              {rfq.items.length}{" "}
              {rfq.items.length === 1 ? "product" : "products"}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-zinc-900 mb-6 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-zinc-400" />
          Status Timeline
        </h3>

        {rejected ? (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
              <Circle size={16} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-800">Rejected</p>
              <p className="text-xs text-red-600">
                This RFQ was not approved.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {STATUS_STEPS.map((step, idx) => {
              const completed = idx <= stepIdx;
              const current = idx === stepIdx;
              return (
                <div key={step} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                        completed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-zinc-100 text-zinc-400"
                      )}
                    >
                      {completed ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <Circle size={16} />
                      )}
                    </div>
                    {idx < STATUS_STEPS.length - 1 && (
                      <div
                        className={cn(
                          "w-0.5 h-6",
                          completed && idx < stepIdx
                            ? "bg-emerald-300"
                            : "bg-zinc-200"
                        )}
                      />
                    )}
                  </div>
                  <div className="pb-6">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        completed ? "text-zinc-900" : "text-zinc-400"
                      )}
                    >
                      {STATUS_LABELS[step]}
                    </p>
                    {current && (
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Current status
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
        <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-200">
          <h3 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
            <Package size={16} className="text-zinc-400" />
            Items
          </h3>
        </div>
        <div className="divide-y divide-zinc-100">
          {rfq.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 px-6 py-4"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 truncate">
                  {item.product.name}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  SKU: {item.product.sku} &middot; Qty: {item.quantity}
                </p>
                {item.notes && (
                  <p className="text-xs text-zinc-500 mt-1 italic">
                    {item.notes}
                  </p>
                )}
              </div>
              <p className="text-sm font-semibold text-zinc-900 shrink-0">
                {formatPrice(Number(item.product.retailPrice) * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {rfq.notes && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="text-sm font-semibold text-zinc-900 mb-2">
            Notes
          </h3>
          <p className="text-sm text-zinc-600 whitespace-pre-wrap">
            {rfq.notes}
          </p>
        </div>
      )}

      {rfq.quotation && (
        <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
          <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-200">
            <h3 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
              <Wallet size={16} className="text-zinc-400" />
              Quotation
            </h3>
          </div>
          <div className="px-6 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Total Amount</span>
              <span className="font-bold text-lg text-zinc-900">
                {formatPrice(Number(rfq.quotation.totalAmount))}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Valid Until</span>
              <span className="font-medium text-zinc-900">
                {formatDate(rfq.quotation.validUntil)}
              </span>
            </div>
            {rfq.quotation.notes && (
              <div className="pt-3 border-t border-zinc-100">
                <p className="text-xs text-zinc-500 mb-1">
                  Quotation Notes
                </p>
                <p className="text-sm text-zinc-700 whitespace-pre-wrap">
                  {rfq.quotation.notes}
                </p>
              </div>
            )}
            <div className="flex justify-between text-xs text-zinc-400 pt-2">
              <span>Quoted on {formatDate(rfq.quotation.createdAt)}</span>
            </div>
          </div>
          {canRespond && (
            <div className="px-6 py-4 border-t border-zinc-200 bg-zinc-50 flex items-center gap-3 justify-end">
              <ApproveRejectButtons rfqId={rfq.id} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

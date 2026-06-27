import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import {
  FileText,
  ChevronRight,
  Plus,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const PAGE_SIZE = 10;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

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
  }).format(iso);
}

export default async function RFQListPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const orgMember = await prisma.orgMember.findUnique({
    where: { userId: session.user.id },
    include: {
      organisation: {
        select: { id: true, name: true },
      },
    },
  });

  const sp = await searchParams;
  const currentPage = Math.max(1, Number(sp.page) || 1);
  const skip = (currentPage - 1) * PAGE_SIZE;

  const [rfqs, total] = orgMember
    ? await Promise.all([
        prisma.rFQ.findMany({
          where: { organisationId: orgMember.organisation.id },
          include: {
            items: {
              include: {
                product: { select: { name: true } },
              },
            },
            quotation: {
              select: { totalAmount: true },
            },
          },
          orderBy: { createdAt: "desc" },
          take: PAGE_SIZE,
          skip,
        }),
        prisma.rFQ.count({
          where: { organisationId: orgMember.organisation.id },
        }),
      ])
    : [[], 0];

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            Requests for Quotation
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            {orgMember
              ? `${orgMember.organisation.name} — ${total} ${total === 1 ? "RFQ" : "RFQs"}`
              : "No organisation linked"}
          </p>
        </div>
        {orgMember && (
          <Link
            href="/account/rfqs/new"
            className={cn(
              "inline-flex items-center gap-1.5",
              "px-4 py-2 rounded-lg text-sm font-semibold",
              "bg-electronics text-white hover:bg-electronics-bar",
              "motion-safe:transition-colors duration-150"
            )}
          >
            <Plus size={16} />
            New RFQ
          </Link>
        )}
      </div>

      {!orgMember ? (
        <div className="flex flex-col items-center py-16 text-center rounded-2xl border border-zinc-200 bg-white">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-100 mb-4">
            <Building2 size={24} className="text-zinc-400" />
          </div>
          <p className="text-sm text-zinc-500 mb-2">
            You are not linked to any organisation.
          </p>
          <p className="text-xs text-zinc-400">
            Contact your admin or register a company to start using B2B
            procurement.
          </p>
        </div>
      ) : rfqs.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center rounded-2xl border border-zinc-200 bg-white">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-100 mb-4">
            <FileText size={24} className="text-zinc-400" />
          </div>
          <p className="text-sm text-zinc-500 mb-4">
            No RFQs submitted yet.
          </p>
          <Link
            href="/account/rfqs/new"
            className={cn(
              "inline-flex items-center gap-1.5",
              "px-4 py-2 rounded-lg text-sm font-semibold",
              "bg-electronics text-white hover:bg-electronics-bar",
              "motion-safe:transition-colors duration-150"
            )}
          >
            <Plus size={16} />
            Create your first RFQ
          </Link>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
            <div className="hidden sm:grid sm:grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 bg-zinc-50 border-b border-zinc-200 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <span>RFQ</span>
              <span>Items</span>
              <span>Date</span>
              <span>Status</span>
              <span>Quotation</span>
            </div>
            <div className="divide-y divide-zinc-100">
              {rfqs.map((rfq) => (
                <Link
                  key={rfq.id}
                  href={`/account/rfqs/${rfq.id}`}
                  className={cn(
                    "grid sm:grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-4",
                    "items-center motion-safe:transition-colors duration-150",
                    "hover:bg-zinc-50"
                  )}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-900 truncate">
                      {rfq.rfqNumber}
                    </p>
                    {rfq.notes && (
                      <p className="text-xs text-zinc-400 truncate mt-0.5">
                        {rfq.notes}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500">
                    {rfq.items.length} {rfq.items.length === 1 ? "item" : "items"}
                  </p>
                  <p className="hidden sm:block text-sm text-zinc-500">
                    {formatDate(rfq.createdAt)}
                  </p>
                  <span
                    className={cn(
                      "inline-flex justify-self-start px-2.5 py-0.5 rounded-full text-xs font-medium",
                      statusVariant(rfq.status)
                    )}
                  >
                    {rfq.status}
                  </span>
                  <div className="flex items-center gap-3 justify-self-end">
                    {rfq.quotation ? (
                      <span className="text-sm font-semibold text-zinc-900">
                        {formatPrice(Number(rfq.quotation.totalAmount))}
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-400">—</span>
                    )}
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
                    href={`/account/rfqs?page=${page}`}
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

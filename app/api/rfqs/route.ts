import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { createRFQSchema } from "@/lib/validations";
import type { ApiResponse } from "@/lib/types";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const orgMember = await prisma.orgMember.findUnique({
      where: { userId: session.user.id },
      select: { organisationId: true },
    });

    if (!orgMember) {
      return NextResponse.json(
        { data: [], error: null },
        { status: 200 }
      );
    }

    const rfqs = await prisma.rFQ.findMany({
      where: { organisationId: orgMember.organisationId },
      include: {
        items: {
          include: {
            product: {
              select: { name: true },
            },
          },
        },
        quotation: {
          select: { totalAmount: true, validUntil: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const mapped = rfqs.map((rfq) => ({
      id: rfq.id,
      rfqNumber: rfq.rfqNumber,
      status: rfq.status,
      notes: rfq.notes,
      budget: rfq.budget ? Number(rfq.budget) : null,
      deliveryDate: rfq.deliveryDate?.toISOString() ?? null,
      createdAt: rfq.createdAt.toISOString(),
      itemCount: rfq.items.length,
      quotation: rfq.quotation
        ? {
            totalAmount: Number(rfq.quotation.totalAmount),
            validUntil: rfq.quotation.validUntil.toISOString(),
          }
        : null,
    }));

    return NextResponse.json(
      { data: mapped, error: null },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to fetch RFQs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const parsed = createRFQSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: parsed.error.message },
        { status: 400 }
      );
    }

    const orgMember = await prisma.orgMember.findUnique({
      where: { userId: session.user.id },
      select: { organisationId: true },
    });

    if (!orgMember) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "You must belong to an organisation to submit an RFQ" },
        { status: 403 }
      );
    }

    const { notes, deliveryDate, budget, items } = parsed.data;

    const count = await prisma.rFQ.count();
    const rfqNumber = `RFQ-${String(count + 1).padStart(6, "0")}`;

    const rfq = await prisma.rFQ.create({
      data: {
        rfqNumber,
        userId: session.user.id,
        organisationId: orgMember.organisationId,
        notes: notes ?? null,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
        budget: budget ?? null,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            notes: item.notes ?? null,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: { name: true },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        data: {
          id: rfq.id,
          rfqNumber: rfq.rfqNumber,
          status: rfq.status,
          notes: rfq.notes,
          budget: rfq.budget ? Number(rfq.budget) : null,
          deliveryDate: rfq.deliveryDate?.toISOString() ?? null,
          createdAt: rfq.createdAt.toISOString(),
          items: rfq.items.map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            notes: item.notes,
            product: { name: item.product.name },
          })),
        },
        error: null,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to create RFQ" },
      { status: 500 }
    );
  }
}

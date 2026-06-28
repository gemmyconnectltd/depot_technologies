import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import type { ApiResponse } from "@/lib/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const orgMember = await prisma.orgMember.findUnique({
      where: { userId: session.user.id },
      select: { organisationId: true },
    });

    if (!orgMember) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Not a member of any organisation" },
        { status: 403 }
      );
    }

    const rfq = await prisma.rFQ.findFirst({
      where: { id, organisationId: orgMember.organisationId },
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
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "RFQ not found" },
        { status: 404 }
      );
    }

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
          updatedAt: rfq.updatedAt.toISOString(),
          submittedBy: rfq.user,
          items: rfq.items.map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            notes: item.notes,
            product: {
              id: item.product.id,
              name: item.product.name,
              slug: item.product.slug,
              sku: item.product.sku,
              retailPrice: Number(item.product.retailPrice),
              image: item.product.images[0]?.url ?? null,
            },
          })),
          quotation: rfq.quotation
            ? {
                id: rfq.quotation.id,
                totalAmount: Number(rfq.quotation.totalAmount),
                validUntil: rfq.quotation.validUntil.toISOString(),
                notes: rfq.quotation.notes,
                createdAt: rfq.quotation.createdAt.toISOString(),
              }
            : null,
        },
        error: null,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to fetch RFQ" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const orgMember = await prisma.orgMember.findUnique({
      where: { userId: session.user.id },
      select: { organisationId: true, role: true },
    });

    if (!orgMember) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Not a member of any organisation" },
        { status: 403 }
      );
    }

    const rfq = await prisma.rFQ.findFirst({
      where: { id, organisationId: orgMember.organisationId },
      select: { id: true, status: true },
    });

    if (!rfq) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "RFQ not found" },
        { status: 404 }
      );
    }

    if (rfq.status !== "QUOTED") {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Only quoted RFQs can be approved or rejected" },
        { status: 400 }
      );
    }

    if (orgMember.role !== "ORG_ADMIN") {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Only organisation admins can approve or reject quotations" },
        { status: 403 }
      );
    }

    const body = await _req.json();
    const { action } = body;

    if (action !== "APPROVE" && action !== "REJECT") {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: "Action must be APPROVE or REJECT" },
        { status: 400 }
      );
    }

    const newStatus = action === "APPROVE" ? "APPROVED" : "REJECTED";

    await prisma.rFQ.update({
      where: { id },
      data: { status: newStatus },
    });

    return NextResponse.json(
      { data: { status: newStatus }, error: null },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: "Failed to update RFQ" },
      { status: 500 }
    );
  }
}

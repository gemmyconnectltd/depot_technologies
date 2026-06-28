import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { registerSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json();

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid input", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, password, phone, orgName } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return Response.json(
      { error: "A user with this email already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone ?? null,
      },
    });

    if (orgName) {
      const org = await tx.organisation.upsert({
        where: { email },
        create: {
          name: orgName,
          email,
          phone: phone ?? null,
        },
        update: {},
      });

      await tx.orgMember.create({
        data: {
          userId: user.id,
          organisationId: org.id,
          role: "ORG_ADMIN",
        },
      });

      await tx.user.update({
        where: { id: user.id },
        data: { role: "ORG_ADMIN" },
      });
    }
  });

  return Response.json({ success: true }, { status: 201 });
}

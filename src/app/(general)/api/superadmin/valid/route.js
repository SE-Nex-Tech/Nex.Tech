import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request) {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);

  const user = session.user.email;

  const valid = await prisma.admin.findMany({
    where: {
      type: "superadmin",
      email: user,
    },
  });

  await prisma.$disconnect();
  return NextResponse.json(valid);
}

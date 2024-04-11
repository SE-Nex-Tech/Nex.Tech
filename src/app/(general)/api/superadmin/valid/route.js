import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  const prisma = new PrismaClient();
  const params = await request.json();

  const valid = await prisma.admin.findMany({
    where: { type: "superadmin" },
  });

  await prisma.$disconnect();
  return NextResponse.json(valid);
}

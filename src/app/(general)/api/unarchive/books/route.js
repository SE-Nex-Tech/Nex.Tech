import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  const params = await request.json();
  const prisma = new PrismaClient();

  let conditions = params['where']

  const result = await prisma.books.updateMany({
    where: conditions,
    data: { archive: false }
  })

  prisma.$disconnect();

  return NextResponse.json(result)
}

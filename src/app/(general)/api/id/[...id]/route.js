import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(NextRequest) {
  const { id } = NextRequest.params;
  const book = await prisma.books.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return NextResponse.json({ book });
}

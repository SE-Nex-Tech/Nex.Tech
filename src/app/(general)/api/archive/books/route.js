import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request) {
  const params = Object.fromEntries(await request.nextUrl.searchParams);

  const prisma = new PrismaClient()

  const booksArchived = await prisma.books.findMany({
    where: {
      archive: true
    },
  })

  const gamesArchived = await prisma.boardgames.findMany({
    where: {
      archive: true
    },
  })

  await prisma.$disconnect()

  const ll = [...booksArchived, ...gamesArchived]

  return NextResponse.json(booksArchived);
}

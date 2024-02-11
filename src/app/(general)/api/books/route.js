import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  const books = await prisma.books.findMany();
  return NextResponse.json(books);
}

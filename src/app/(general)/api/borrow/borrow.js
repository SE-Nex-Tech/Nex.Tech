import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function borrow(materialID) {
  // const books = await prisma.books.findMany();
  const books = await prisma.books.findUnique({
    where: {
      id: materialID
    }
  });
  console.log("Book to borrow: ----------------");
  // console.log(Object.keys(books).length);
  console.log(books);
  return 'hello world';
}

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const params = await request.json();
  console.log(params);

  let entity = (params['entity'] == 'books') ? prisma.books : prisma.games;

  let books = await entity.findMany({
    where: params['where']
  });

  if (params['search'] != undefined) {
    const condition = {}
    condition[params['attribute']] = {
      contains: params['contains'],
      mode: "insensitive"
    }
    books = await entity.findMany({
      where: condition
    });
  }

  prisma.$disconnect();

  return NextResponse.json(books);
}

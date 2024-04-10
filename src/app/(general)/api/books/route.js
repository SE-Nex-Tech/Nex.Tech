import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  const params = Object.fromEntries(await request.nextUrl.searchParams);
  const books = await prisma.books.findMany({
    orderBy: {
      id: "asc",
    }
  });
  // console.log(params['andy'] == 'value');
  return NextResponse.json(books);
}

export async function POST(request) {
  const params = await request.json();
  console.log(params);

  // const books = (params['where'] == undefined) ? await prisma.books.findMany() : await prisma.books.findMany(
  //   {
  //     where: params['where'],
  //   }
  // );

  let books = await prisma.books.findMany({
    where: params['where']
  });

  if (params['search'] != undefined) {
    const condition = {}
    condition[params['attribute']] = {
      contains: params['contains'],
      mode: "insensitive"
    }
    books = await prisma.books.findMany({
      where: condition
    });
  }

  return NextResponse.json(books);
}

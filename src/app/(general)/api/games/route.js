import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  const params = Object.fromEntries(await request.nextUrl.searchParams);
  const games = await prisma.Boardgames.findMany({
    where: { archive: false },
    orderBy: {
      id: 'asc',
    }
  });
  // console.log(params['andy'] == 'value');
  return NextResponse.json(games);
}

export async function POST(request) {
  const params = await request.json();
  console.log(params);

  let games = await prisma.Boardgames.findMany({
    where: params["where"],
  });

  if (params["search"] != undefined) {
    const condition = {};
    condition[params["attribute"]] = {
      contains: params["contains"],
      mode: "insensitive",
    };
    games = await prisma.Boardgames.findMany({
      where: condition,
    });
  }

  return NextResponse.json(games);
}

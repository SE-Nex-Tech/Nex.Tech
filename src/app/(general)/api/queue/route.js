import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { bookQ, gameQ, allQ, booksIU, gamesIU } from "./q_funcs.js";

export async function POST(request) {
  const prisma = new PrismaClient();
  const params = await request.json();

  const id = params["id"];

  const bq = await bookQ(prisma, id);
  const gq = await gameQ(prisma, id);
  const allq = await allQ(prisma);
  const biu = await booksIU(prisma);
  const giu = await gamesIU(prisma);

  return NextResponse.json({
    bq,
    gq,
    allq,
    biu,
    giu,
  });
}

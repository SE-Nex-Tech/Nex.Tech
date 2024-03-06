import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const requests_interval = async (a, b, prisma) => {
  return await prisma.requests.findMany({
    where: {
      AND: [
        {
          date: {
            lte: a
          }
        },
        {
          date: {
            gte: b
          }
        }
      ]
    }
  })
}

const bookStatistics = async(ls, prisma) => {
  const bookReqs = await prisma.BookRequest.findMany({
    where: {
      request_id: { in: ls }
    },
    select: {
      request_id: true,
      book_id: true,
      book: true
    }
  });

  return bookReqs;
}

const gameStatistics = async(ls, prisma) => {
  const gameReqs = await prisma.BoardgameRequest.findMany({
    where: {
      request_id: { in: ls }
    },
    select: {
      request_id: true,
      boardgame_id: true,
      boardgame: true
    }
  });

  return gameReqs;
}

export async function POST(request) {
  const prisma = new PrismaClient();
  const params = await request.json();
  console.log(params);

  let a = params.value != undefined ? new Date(params.value) : undefined;
  let b = params.value2 != undefined ? new Date(params.value2) : undefined;

  if (!(a < b)) {
    // todo: set analytics
    let currentDate = new Date();
    let lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const result = await requests_interval(currentDate, lastMonth, prisma);
    const requestIDs = result.map((r) => r.id);
    const bookStats = await bookStatistics(requestIDs, prisma);
    const gameStats = await gameStatistics(requestIDs, prisma);

    return NextResponse.json({
      invalid_dates: 1,
      result
    });
  }

  prisma.$disconnect()

  return NextResponse.json({});
}


import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const requests_interval = async (a, b, prisma) => {
  // TODO: query complete transactions only
  // can't be done until the transaction process for borrowing fills out the return date column
  return await prisma.requests.findMany({
    where: {
      AND: [
        {
          date: {
            lte: a,
          },
        },
        {
          date: {
            gte: b,
          },
        },
      ],
    },
    orderBy: {
      date: 'desc'
    }
  });
};

const bookRequests = async (ls, prisma) => {
  const bookReqs = await prisma.BookRequest.findMany({
    where: {
      request_id: { in: ls },
    },
    select: {
      request_id: true,
      book_id: true,
      book: true,
    },
  });

  return bookReqs;
};

const gameRequests = async (ls, prisma) => {
  const gameReqs = await prisma.BoardgameRequest.findMany({
    where: {
      request_id: { in: ls },
    },
    select: {
      request_id: true,
      boardgame_id: true,
      boardgame: true,
    },
  });

  return gameReqs;
};

// TODO: analytics of book and games
const bookStatistics = async (ls, prisma) => {
  const book_requests_count = await prisma.BookRequest.groupBy({
    by: "book_id",
    where: {
      request_id: { in: ls },
    },
    _count: {
      book_id: true,
    },
    orderBy: {
      _count: {
        book_id: "desc",
      },
    },
  });

  return book_requests_count;
};

const gameStatistics = async (ls, prisma) => {
  const game_requests_count = await prisma.BoardgameRequest.groupBy({
    by: "boardgame_id",
    where: {
      request_id: { in: ls },
    },
    _count: {
      boardgame_id: true,
    },
    orderBy: {
      _count: {
        boardgame_id: "desc",
      },
    },
  });

  return game_requests_count;
};

export async function POST(request) {
  const prisma = new PrismaClient();
  const params = await request.json();

  let a = params.value != undefined ? new Date(params.value) : undefined;
  let b = params.value2 != undefined ? new Date(params.value2) : undefined;

  if (!(a < b)) {
    let currentDate = new Date();
    let lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const result = await requests_interval(currentDate, lastMonth, prisma);
    const requestIDs = result.map((r) => r.id);
    const bookReqs = await bookRequests(requestIDs, prisma);
    const gameReqs = await gameRequests(requestIDs, prisma);

    const book_requests_count = await bookStatistics(requestIDs, prisma);
    const game_requests_count = await gameStatistics(requestIDs, prisma);

    return NextResponse.json({
      invalid_dates: 1,
      result,
      bookReqs,
      gameReqs,
      book_requests_count,
      game_requests_count,
    });
  }

  const result = await requests_interval(b, a, prisma);
  const requestIDs = result.map((r) => r.id);
  const bookReqs = await bookRequests(requestIDs, prisma);
  const gameReqs = await gameRequests(requestIDs, prisma);

  const book_requests_count = await bookStatistics(requestIDs, prisma);
  const game_requests_count = await gameStatistics(requestIDs, prisma);

  prisma.$disconnect();

  return NextResponse.json({
    result,
    bookReqs,
    gameReqs,
    book_requests_count,
    game_requests_count,
  });
}

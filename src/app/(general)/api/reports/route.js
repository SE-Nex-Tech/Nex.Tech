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
      date: "desc",
    },
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

const mapStatToBook = async (ls, prisma) => {
  let stats = await bookStatistics(ls, prisma);
  const books = await prisma.books.findMany({
    where: {
      id: { in: stats.map((r) => r.book_id) },
    },
  });

  const randomHEX = () => {
    const alph = "ABCDEF0123456789";
    let hex = "#";
    for (let i = 0; i < 6; i++) {
      let random = Math.floor(Math.random() * alph.length);
      hex += alph[random];
    }

    return hex;
  };

  const data = stats.map((r) => ({
    name: books.find((e) => e.id === r.book_id).title,
    value: r._count.book_id,
    color: randomHEX(),
  }));

  return data;
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

const mapStatToGame = async (ls, prisma) => {
  let stats = await gameStatistics(ls, prisma);
  const books = await prisma.boardgames.findMany({
    where: {
      id: { in: stats.map((r) => r.boardgame_id) },
    },
  });

  const randomHEX = () => {
    const alph = "ABCDEF0123456789";
    let hex = "#";
    for (let i = 0; i < 6; i++) {
      let random = Math.floor(Math.random() * alph.length);
      hex += alph[random];
    }

    return hex;
  };

  const data = stats.map((r) => ({
    name: books.find((e) => e.id === r.boardgame_id).title,
    value: r._count.boardgame_id,
    color: randomHEX(),
  }));

  return data;
};

const fetchUsers = async (ls, prisma) => {
  const students = await prisma.Student.findMany({
    where: {
      request_id: { in: ls },
    },
  });

  const faculty = await prisma.Faculty.findMany({
    where: {
      request_id: { in: ls },
    },
  });

  const staff = await prisma.Staff.findMany({
    where: {
      request_id: { in: ls },
    },
  });

  return {
    students,
    faculty,
    staff,
  };
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

    const users = await fetchUsers(requestIDs, prisma);

    const bookRC = await mapStatToBook(requestIDs, prisma);
    const gameRC = await mapStatToGame(requestIDs, prisma);

    return NextResponse.json({
      invalid_dates: 1,
      result,
      bookReqs,
      gameReqs,
      book_requests_count,
      game_requests_count,
      users,
      bookRC,
      gameRC,
    });
  }

  const result = await requests_interval(b, a, prisma);
  const requestIDs = result.map((r) => r.id);
  const bookReqs = await bookRequests(requestIDs, prisma);
  const gameReqs = await gameRequests(requestIDs, prisma);

  const book_requests_count = await bookStatistics(requestIDs, prisma);
  const game_requests_count = await gameStatistics(requestIDs, prisma);

  const users = await fetchUsers(requestIDs, prisma);

  const bookRC = await mapStatToBook(requestIDs, prisma);
  const gameRC = await mapStatToGame(requestIDs, prisma);

  prisma.$disconnect();

  return NextResponse.json({
    result,
    bookReqs,
    gameReqs,
    book_requests_count,
    game_requests_count,
    users,
    bookRC,
    gameRC,
  });
}

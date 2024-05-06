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



const countBookUserType = async (ls, prisma) => {
  const bookUserTypeC = await prisma.requests.groupBy({
    by: "user_type",
    where: {
      id: { in: ls },
      type: "Book",
    },
    _count: {
      user_type: true,
    },
    orderBy: {
      _count: {
        user_type: "desc",
      },
    },
  });

  return bookUserTypeC;
};

const countGameUserType = async (ls, prisma) => {
  const gameUserTypeC = await prisma.requests.groupBy({
    by: "user_type",
    where: {
      id: { in: ls },
      type: "Boardgame",
    },
    _count: {
      user_type: true,
    },
    orderBy: {
      _count: {
        user_type: "desc",
      },
    },
  });

  return gameUserTypeC;
};

const getStudentRequests = async (ls, prisma) => {
  const studentReqs = await prisma.requests.findMany({
    where: {
      id: { in: ls },
      user_type: "Student",
    },
  });

  return studentReqs;
};

const countBookYearLevel = async (ls, prisma) => {
  const studentReqs = await prisma.requests.findMany({
    where: {
      id: { in: ls },
      user_type: "Student",
      type: "Book",
    },
  });

  const studentReqsIDs = studentReqs.map((r) => r.id);

  const bookYearLevelC = await prisma.student.groupBy({
    by: "year_level",
    where: {
      request_id: { in: studentReqsIDs },
    },
    _count: {
      year_level: true,
    },
    orderBy: {
      _count: {
        year_level: "desc",
      },
    },
  });

  return bookYearLevelC;
};

const countGameYearLevel = async (ls, prisma) => {
  const studentReqs = await prisma.requests.findMany({
    where: {
      id: { in: ls },
      user_type: "Student",
      type: "Boardgame",
    },
  });

  const studentReqsIDs = studentReqs.map((r) => r.id);

  const gameYearLevelC = await prisma.student.groupBy({
    by: "year_level",
    where: {
      request_id: { in: studentReqsIDs },
    },
    _count: {
      year_level: true,
    },
    orderBy: {
      _count: {
        year_level: "desc",
      },
    },
  });

  return gameYearLevelC;
};

const countBookDept = async (ls, prisma) => {
  const studentReqs = await prisma.requests.findMany({
    where: {
      id: { in: ls },
      user_type: "Student",
      type: "Book",
    },
  });

  const studentReqsIDs = studentReqs.map((r) => r.id);

  const bookDeptC = await prisma.student.groupBy({
    by: "department",
    where: {
      request_id: { in: studentReqsIDs },
    },
    _count: {
      department: true,
    },
    orderBy: {
      _count: {
        department: "desc",
      },
    },
  });

  return bookDeptC;
};

const countGameDept = async (ls, prisma) => {
  const studentReqs = await prisma.requests.findMany({
    where: {
      id: { in: ls },
      user_type: "Student",
      type: "Boardgame",
    },
  });

  const studentReqsIDs = studentReqs.map((r) => r.id);

  const gameDeptC = await prisma.student.groupBy({
    by: "department",
    where: {
      request_id: { in: studentReqsIDs },
    },
    _count: {
      department: true,
    },
    orderBy: {
      _count: {
        department: "desc",
      },
    },
  });

  return gameDeptC;
};


const chartColors = ['#FF0000', '#CC0000', '#990000', '#660000'];


const mapStatToBook1 = async (ls, prisma) => {
  const stats = await countBookUserType(ls, prisma);

  // Index to keep track of which shade to use
  let shadeIndex = 0;

  const randomHEX = () => {
    const alph = "ABCDEF0123456789";
    let hex = "#";
    for (let i = 0; i < 6; i++) {
      let random = Math.floor(Math.random() * alph.length);
      hex += alph[random];
    }

    return hex;
  };

  const data = stats.map((r, index) => ({
    name: r.user_type,
    value: r._count.user_type,
    color: chartColors[index],
  }));

  return data;
};

const mapStatToBook2 = async (ls, prisma) => {
  const stats = await countBookYearLevel(ls, prisma);

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
    name: r.year_level,
    value: r._count.year_level,
    color: randomHEX(),
  }));

  return data;
};

const mapStatToBook3 = async (ls, prisma) => {
  const stats = await countBookDept(ls, prisma);

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
    name: r.department,
    value: r._count.department,
    color: randomHEX(),
  }));

  return data;
};

const mapStatToGame1 = async (ls, prisma) => {
  let stats = await countGameUserType(ls, prisma);

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
    name: r.user_type,
    value: r._count.user_type,
    color: randomHEX(),
  }));

  return data;
};

const mapStatToGame2 = async (ls, prisma) => {
  let stats = await countGameYearLevel(ls, prisma);

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
    name: r.year_level,
    value: r._count.year_level,
    color: randomHEX(),
  }));

  return data;
};

const mapStatToGame3 = async (ls, prisma) => {
  let stats = await countGameDept(ls, prisma);

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
    name: r.department,
    value: r._count.department,
    color: randomHEX(),
  }));

  return data;
};

export async function POST(request) {
  const prisma = new PrismaClient();
  const params = await request.json();

  console.log(params.value);
  console.log(params.value2);

  const startDate = new Date(params.value);
  const endDate = new Date(params.value2);

  // Set end date time to 11:59 PM
  endDate.setHours(23);
  endDate.setMinutes(59);
  endDate.setSeconds(59);

  const startDatePH = startDate.toLocaleString('en-US', { timeZone: 'Asia/Manila' });
  const endDatePH = endDate.toLocaleString('en-US', { timeZone: 'Asia/Manila' });


  console.log(startDatePH);
  console.log(endDatePH);

  let a = startDatePH != undefined ? new Date(startDatePH) : undefined;
  let b = endDatePH != undefined ? new Date(endDatePH) : undefined;

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

    const bookUserTypeC = await countBookUserType(requestIDs, prisma);
    const gameUserTypeC = await countGameUserType(requestIDs, prisma);

    const studentReqs = await getStudentRequests(requestIDs, prisma);

    const bookYearLevelC = await countBookYearLevel(requestIDs, prisma);
    const gameYearLevelC = await countGameYearLevel(requestIDs, prisma);

    const bookDeptC = await countBookDept(requestIDs, prisma);
    const gameDeptC = await countGameDept(requestIDs, prisma);

    const bookPie1 = await mapStatToBook1(requestIDs, prisma);
    const bookPie2 = await mapStatToBook2(requestIDs, prisma);
    const bookPie3 = await mapStatToBook3(requestIDs, prisma);

    const gamePie1 = await mapStatToGame1(requestIDs, prisma);
    const gamePie2 = await mapStatToGame2(requestIDs, prisma);
    const gamePie3 = await mapStatToGame3(requestIDs, prisma);

    return NextResponse.json({
      invalid_dates: 1,
      result,
      bookReqs,
      gameReqs,
      book_requests_count,
      game_requests_count,
      users,
      bookUserTypeC,
      gameUserTypeC,
      studentReqs,
      bookYearLevelC,
      gameYearLevelC,
      bookDeptC,
      gameDeptC,
      bookPie1,
      bookPie2,
      bookPie3,
      gamePie1,
      gamePie2,
      gamePie3,
    });
  }

  const result = await requests_interval(b, a, prisma);
  const requestIDs = result.map((r) => r.id);
  const bookReqs = await bookRequests(requestIDs, prisma);
  const gameReqs = await gameRequests(requestIDs, prisma);

  const book_requests_count = await bookStatistics(requestIDs, prisma);
  const game_requests_count = await gameStatistics(requestIDs, prisma);

  const users = await fetchUsers(requestIDs, prisma);


  const bookUserTypeC = await countBookUserType(requestIDs, prisma);
  const gameUserTypeC = await countGameUserType(requestIDs, prisma);

  const studentReqs = await getStudentRequests(requestIDs, prisma);

  const bookYearLevelC = await countBookYearLevel(requestIDs, prisma);
  const gameYearLevelC = await countGameYearLevel(requestIDs, prisma);

  const bookDeptC = await countBookDept(requestIDs, prisma);
  const gameDeptC = await countGameDept(requestIDs, prisma);

  const bookPie1 = await mapStatToBook1(requestIDs, prisma);
  const bookPie2 = await mapStatToBook2(requestIDs, prisma);
  const bookPie3 = await mapStatToBook3(requestIDs, prisma);
  
  const gamePie1 = await mapStatToGame1(requestIDs, prisma);
  const gamePie2 = await mapStatToGame2(requestIDs, prisma);
  const gamePie3 = await mapStatToGame3(requestIDs, prisma);

  prisma.$disconnect();

  return NextResponse.json({
    result,
    bookReqs,
    gameReqs,
    book_requests_count,
    game_requests_count,
    users,
    bookUserTypeC,
    gameUserTypeC,
    studentReqs,
    bookYearLevelC,
    gameYearLevelC,
    bookDeptC,
    gameDeptC,
    bookPie1,
    bookPie2,
    bookPie3,
    gamePie1,
    gamePie2,
    gamePie3,
  });
}

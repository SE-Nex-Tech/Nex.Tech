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


const chartColors = [
  '#af1526',
  '#315991',
  '#ffc000',
  '#1d7f34'];


const mapStatToBook1 = async (ls, prisma) => {
  const stats = await countBookUserType(ls, prisma);

  // const randomHEX = () => {
  //   const alph = "ABCDEF0123456789";
  //   let hex = "#";
  //   for (let i = 0; i < 6; i++) {
  //     let random = Math.floor(Math.random() * alph.length);
  //     hex += alph[random];
  //   }

  //   return hex;
  // };

  const data = stats.map((r, index) => ({
    name: r.user_type,
    value: r._count.user_type,
    color: chartColors[index],
  }));

  return data;
};

const mapStatToBook2 = async (ls, prisma) => {
  const stats = await countBookYearLevel(ls, prisma);

  // Custom sorting function to sort year levels numerically
  const customSort = (a, b) => {
    // Extract the numeric part of the year level strings
    const numA = parseInt(a.year_level);
    const numB = parseInt(b.year_level);
    return numA - numB; // Sort in ascending order, change to numB - numA for descending
  };

  // Sort stats by year level using the custom sorting function
  stats.sort(customSort);

  const data = stats.map((r, index) => ({
    name: r.year_level,
    value: r._count.year_level,
    color: chartColors[index],
  }));

  return data;
};

const mapStatToBook3 = async (ls, prisma) => {
  const stats = await countBookDept(ls, prisma);

  const data = stats.map((r, index) => ({
    name: r.department,
    value: r._count.department,
    color: chartColors[index],
  }));

  return data;
};

const mapStatToGame1 = async (ls, prisma) => {
  let stats = await countGameUserType(ls, prisma);

  const data = stats.map((r, index) => ({
    name: r.user_type,
    value: r._count.user_type,
    color: chartColors[index],
  }));

  return data;
};

const mapStatToGame2 = async (ls, prisma) => {
  let stats = await countGameYearLevel(ls, prisma);

  // Custom sorting function to sort year levels numerically
  const customSort = (a, b) => {
    // Extract the numeric part of the year level strings
    const numA = parseInt(a.year_level);
    const numB = parseInt(b.year_level);
    return numA - numB; // Sort in ascending order, change to numB - numA for descending
  };

  // Sort stats by year level using the custom sorting function
  stats.sort(customSort);

  const data = stats.map((r, index) => ({
    name: r.year_level,
    value: r._count.year_level,
    color: chartColors[index],
  }));

  return data;
};

const mapStatToGame3 = async (ls, prisma) => {
  let stats = await countGameDept(ls, prisma);

  const data = stats.map((r, index) => ({
    name: r.department,
    value: r._count.department,
    color: chartColors[index],
  }));

  return data;
};


const getBarChartData = async (requestIDs, prisma) => {
  // Function to get the start date of the week
  const getWeekStartDate = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  // Function to format date range
  const formatDateRange = (startDate, endDate) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return `${startDate.toLocaleDateString(undefined, options)} - ${endDate.toLocaleDateString(undefined, options)}`;
  };

  // Fetch all requests for books
  const bookRequests = await prisma.requests.findMany({
    where: {
      id: { in: requestIDs },
      type: 'Book',
    },
    orderBy: {
      date: 'asc', // Order by date in ascending order
    },
  });

  // Fetch all requests for board games
  const boardGameRequests = await prisma.requests.findMany({
    where: {
      id: { in: requestIDs },
      type: 'Boardgame', // Adjusted to 'Boardgame'
    },
    orderBy: {
      date: 'asc', // Order by date in ascending order
    },
  });

  // Combine book and board game requests
  const allRequests = [...bookRequests, ...boardGameRequests];

  // Group requests by week
  const requestsByWeek = {};
  allRequests.forEach((request) => {
    const weekStartDate = getWeekStartDate(request.date);
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6); // Add 6 days for the end of the week
    const weekKey = formatDateRange(weekStartDate, weekEndDate);
    if (!requestsByWeek[weekKey]) {
      requestsByWeek[weekKey] = {
        dateRange: weekKey,
        bookCount: 0,
        gameCount: 0,
      };
    }
    if (request.type === 'Book') {
      requestsByWeek[weekKey].bookCount++;
    } else if (request.type === 'Boardgame') { // Adjusted to 'Boardgame'
      requestsByWeek[weekKey].gameCount++; // Adjusted to 'gameCount'
    }
  });

  // Convert object to array
  const barChartData = Object.values(requestsByWeek);

  return barChartData;
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

    const barData = await getBarChartData(requestIDs, prisma);


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
      barData,
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

  const barData = await getBarChartData(requestIDs, prisma);

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
    barData,
  });
}

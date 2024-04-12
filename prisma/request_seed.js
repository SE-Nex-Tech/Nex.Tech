const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcrypt");
const fs = require("fs");
const csv = require("csv-parser");

const path = require("path");
const requestsFilePath = path.resolve(__dirname, "../src/data/requests.csv");


const prisma = new PrismaClient();

async function main() {

  const requests = [];
  fs.createReadStream(requestsFilePath)
    .pipe(csv())
    .on("data", (row) => {
      row.id = parseInt(row.id, 10);
      row.date = new Date(row.date);
      row.borrow_date = new Date(row.borrow_date);
      row.return_date = new Date(row.return_date);
      requests.push(row);
    })
    .on("end", async () => {
      for (const data of requests) {
        if (data.type == "Book") {
          if (data.user_type == "Student") {
            const request = await prisma.requests.create({
              data: {

                date: data.date,
                borrow_date: data.borrow_date,
                return_date: data.return_date,
                status: data.status,
                type: data.type,
                user_type: data.user_type,
                bookRequests: {
                  create:
                  {
                    book: {
                      connect: { id: Math.floor(Math.random() * 200) + 1 },
                    },
                  },

                },
                user_student: {
                  create:
                  {
                    student_num: "2021131421",
                    name: "Sample Name",
                    department: "Computer Science",
                    year_level: "3rd Year",
                    section: "3CSC",
                    email: "sample@email.com",
                  }
                }

              },
            });
          } else if (data.user_type == "Faculty") {
            const request = await prisma.requests.create({
              data: {

                date: data.date,
                borrow_date: data.borrow_date,
                return_date: data.return_date,
                status: data.status,
                type: data.type,
                user_type: data.user_type,
                bookRequests: {
                  create:
                  {
                    book: {
                      connect: { id: Math.floor(Math.random() * 200) + 1 },
                    },
                  },

                },
                user_faculty: {
                  create:
                  {
                    employee_num: "2021131232",
                    name: "Sample Name",
                    email: "sample@email.com",
                    department: "Information Technology",
                  }
                }

              },
            });
          } else if (data.user_type == "Staff") {
            const request = await prisma.requests.create({
              data: {

                date: data.date,
                borrow_date: data.borrow_date,
                return_date: data.return_date,
                status: data.status,
                type: data.type,
                user_type: data.user_type,
                bookRequests: {
                  create:
                  {
                    book: {
                      connect: { id: Math.floor(Math.random() * 200) + 1 },
                    },
                  },

                },
                user_staff: {
                  create:
                  {
                    employee_num: "2021131232",
                    name: "Sample Name",
                    email: "sample@email.com",
                  }
                }

              },
            });
          }

        }

        if (data.type == "Boardgame") {
          if (data.user_type == "Student") {
            const request = await prisma.requests.create({
              data: {

                date: data.date,
                borrow_date: data.borrow_date,
                return_date: data.return_date,
                status: data.status,
                type: data.type,
                user_type: data.user_type,
                boardgameRequests: {
                  create:
                  {
                    boardgame: {
                      connect: { id: Math.floor(Math.random() * 15) + 1 },
                    },
                  },

                },
                user_student: {
                  create:
                  {
                    student_num: "2021131421",
                    name: "Sample Name",
                    department: "Computer Science",
                    year_level: "3rd Year",
                    section: "3CSC",
                    email: "sample@email.com",
                  }
                }
              },
            });
          } else if (data.user_type == "Faculty") {
            const request = await prisma.requests.create({
              data: {

                date: data.date,
                borrow_date: data.borrow_date,
                return_date: data.return_date,
                status: data.status,
                type: data.type,
                user_type: data.user_type,
                boardgameRequests: {
                  create:
                  {
                    boardgame: {
                      connect: { id: Math.floor(Math.random() * 15) + 1 },
                    },
                  },

                },
                user_faculty: {
                  create:
                  {
                    employee_num: "2021131232",
                    name: "Sample Name",
                    email: "sample@email.com",
                    department: "Information Technology",
                  }
                }
              },
            });
          } else if (data.user_type == "Staff") {
            const request = await prisma.requests.create({
              data: {

                date: data.date,
                borrow_date: data.borrow_date,
                return_date: data.return_date,
                status: data.status,
                type: data.type,
                user_type: data.user_type,
                boardgameRequests: {
                  create:
                  {
                    boardgame: {
                      connect: { id: Math.floor(Math.random() * 15) + 1 },
                    },
                  },

                },
                user_staff: {
                  create:
                  {
                    employee_num: "2021131232",
                    name: "Sample Name",
                    email: "sample@email.com",
                  }
                }
              },
            });
          }

        }
      }

      await prisma.$disconnect();
    });



}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

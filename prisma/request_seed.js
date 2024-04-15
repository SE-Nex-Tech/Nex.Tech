const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcrypt");
const fs = require("fs");
const csv = require("csv-parser");

const path = require("path");
const requestsFilePath = path.resolve(__dirname, "../src/data/requests.csv");

// Define options for department and their corresponding weights
const departmentOptions = [
  { value: "Computer Science", weight: 3 },
  { value: "Information Technology", weight: 4 },
  { value: "Information Systems", weight: 2 },
];

// Define options for year_level and their corresponding weights
const yearLevelOptions = [
  { value: "1st Year", weight: 3 },
  { value: "2nd Year", weight: 4 },
  { value: "3rd Year", weight: 2 },
  { value: "4th Year", weight: 2 }
];

// Function to select a random element considering weights
function weightedRandom(weights) {
  const totalWeight = weights.reduce((acc, option) => acc + option.weight, 0);
  let random = Math.random() * totalWeight;

  for (const option of weights) {
    random -= option.weight;
    if (random <= 0) return option.value;
  }
}

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
        const randomDepartment = weightedRandom(departmentOptions);
        const randomYearLevel = weightedRandom(yearLevelOptions);

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
                    department: randomDepartment,
                    year_level: randomYearLevel,
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
                    department: randomDepartment,
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
                    department: randomDepartment,
                    year_level: randomYearLevel,
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
                    department: randomDepartment,
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

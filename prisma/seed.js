const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcrypt");
const fs = require("fs");
const csv = require("csv-parser");

const path = require("path");
const booksFilePath = path.resolve(__dirname, "../src/data/books.csv");
const boardgamesFilePath = path.resolve(__dirname, "../src/data/boardgames.csv");
const requestsFilePath = path.resolve(__dirname, "../src/data/requests.csv");


const prisma = new PrismaClient();

async function main() {
  const password = await hash("test", 12);
  const admin = await prisma.admin.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      fn: "Test",
      ln: "Admin",
      type: 'superadmin',
      password,
      access: true
    },
  });
  const createAdmins = await prisma.admin.createMany({
    data: [
      { email: "edjin@edjin.com", fn: "edjin", type: 'admin', password, access: true },
      { email: "carl@carl.com", fn: "carl", type: 'admin', password, access: true },
      { email: "chy@chy.com", fn: "chy", type: 'admin', password, access: true },
      { email: "kyle@kyle.com", fn: "Kyle", type: 'admin', password, access: true },
    ],
    skipDuplicates: true,
  });

  const books = [];
  fs.createReadStream(booksFilePath)
    .pipe(csv())
    .on("data", (row) => {
      // row.id = parseInt(row.id, 10);
      delete row.id
      row.barcode = parseInt(row.barcode, 10);
      row.accession_num = parseInt(row.accession_num, 10);
      row.copyright_date = new Date(row.copyright_date);
      books.push(row);
    })
    .on("end", async () => {
      await prisma.books.createMany({
        data: books,
        skipDuplicates: true,
      });

      await prisma.$disconnect();
    });


  const boardgames = [];
  fs.createReadStream(boardgamesFilePath)
    .pipe(csv())
    .on("data", (row) => {
      row.id = parseInt(row.id, 10);
      row.accession_num = parseInt(row.accession_num, 10);
      row.copyright_date = new Date(row.copyright_date);
      boardgames.push(row);
    })
    .on("end", async () => {
      await prisma.boardgames.createMany({
        data: boardgames,
        skipDuplicates: true,
      });

      await prisma.$disconnect();
    });

}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
  });

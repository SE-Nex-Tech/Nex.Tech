const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcrypt");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const csvFilePath = path.resolve(__dirname, "../src/data/books.csv");

const prisma = new PrismaClient();

async function main() {
  const password = await hash("test", 12);
  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      name: "Test User",
      password,
    },
  });
  const createUsers = await prisma.user.createMany({
    data: [
      { email: "edjin@edjin.com", name: "edjin", password },
      { email: "carl@carl.com", name: "carl", password },
      { email: "chy@chy.com", name: "chy", password },
      { email: "kyle@kyle.com", name: "Kyle", password },
    ],
    skipDuplicates: true,
  });
  console.log({ user });

  const books = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      row.book_barcode = parseInt(row.book_barcode, 10);
      row.book_accession_num = parseInt(row.book_accession_num, 10);
      books.push(row);
    })
    .on("end", async () => {
      await prisma.books.createMany({
        data: books,
        skipDuplicates: true,
      });

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

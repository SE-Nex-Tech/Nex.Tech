import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function borrow(req) {
  // const books = await prisma.books.findMany();
  const books = await prisma.books.findUnique({
    where: {
      id: parseInt(req['materialID'])
    }
  });
  console.log("Book to borrow: ----------------");
  console.log(books);

  const aiw = await prisma.books.create({
    data: borrow_book(req)
  })

  console.log(aiw);
  return 'end of borrow';
}

function borrow_book(params) {
  return {
      book_barcode: 696969,
      book_call_num: "hatdog",
      book_title: "hatdog",
      book_accession_num: 123,
      book_author: "hev abi",
      book_edition: "0.6",
      book_publication_place: "sa bahay",
      book_publisher: "OC records"
    }
}

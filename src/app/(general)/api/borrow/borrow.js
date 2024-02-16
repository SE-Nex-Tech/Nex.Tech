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

  const borrow_material_record = await prisma.request.create({
    data: borrow_book(req)
  })

  console.log(borrow_material_record);
  console.log(new Date().toLocaleString());
  return 'end of borrow';
}

function borrow_book(params) {
  return {
    request_datetime: params['requestDate'],
    request_user_type: params['userType'],
    request_type: params['requestType'],
    borrow_datetime: new Date().toLocaleString(),
    return_datetime: null,
    request_status: "borrow",
  }
}

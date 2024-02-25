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

  const borrow_material_record = await prisma.requests.create({
    data: borrow_book(req)
  })

  // console.log('book requests');
  // console.log(await prisma.bookrequest.findMany());

  // console.log(new Date().toLocaleString());
  return borrow_material_record;
}

function borrow_book(params) {
  return {
    date: params['date'],
    borrow_date: new Date().toISOString(),
    return_date: null,
    status: 'borrow',
    type: params['type'],
    user_type: params['user_type'],
    bookRequests: {
      create: {
        book: {
          connect: {
            id: params['materialID']
          }
        }
      }
    },
    user_student: {
      create: {
        student_num: params['studentID'],
        name: params['name'],
        email: params['email'],
        department: params['department'],
        year_level: params['year_level'],
        section: params['section']
      }
    }
  }
}

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import logger from '@/logger/logger'

const prisma = new PrismaClient();

export async function borrow(req) {
  // const books = await prisma.books.findMany();
  let material
  if (req['entity'] === 'book') {
    material = await prisma.books.findUnique({
      where: {
        id: parseInt(req['materialID'])
      }
    });
  } else {
    material = await prisma.boardgames.findUnique({
      where: {
        id: parseInt(req['materialID'])
      }
    })
  }
  console.log("Material to borrow: ----------------");
  console.log(material);
  logger('Created a borrow ticket for ' + material.title + ' by ' + req['name'], false)


  let temp;
  switch (req['user_type']) {
    case 'Student':
      temp = borrow_Student(req)
      return await prisma.requests.create({
        data: getMaterial(req, temp)
        });
    case 'Faculty':
      temp = borrow_Faculty(req)
      return await prisma.requests.create({
        data: getMaterial(req, temp)
        });
    case 'Staff':
      temp = borrow_Staff(req)
      return await prisma.requests.create({
          data: getMaterial(req, temp)
        });
    default:
      return null;
  }
  // console.log('book requests');
  // console.log(await prisma.bookrequest.findMany());

  // console.log(new Date().toLocaleString());

}

function borrow_Student(params) {
  return {
    date: params['date'],
    borrow_date: null,
    return_date: null,
    status: 'Pending Borrow',
    type: params['type'],
    user_type: params['user_type'],
    user_student: {
      create: {
        student_num: params['studentID'],
        name: params['name'],
        email: params['email'],
        department: params['department'],
        year_level: params['year_level'],
        section: params['section']
      }
    },

  }
}

function borrow_Faculty(params) {
  return {
    date: params['date'],
    borrow_date: null,
    return_date: null,
    status: 'Pending Borrow',
    type: params['type'],
    user_type: params['user_type'],
    user_faculty: {
      create: {
        employee_num: params['employeeID'],
        name: params['name'],
        email: params['email'],
        department: params['department']
    }
    },

  }

}

function borrow_Staff(params) {
  return {
    date: params['date'],
    borrow_date: null,
    return_date: null,
    status: 'Pending Borrow',
    type: params['type'],
    user_type: params['user_type'],
    user_staff: {
      create: {
        employee_num: params['employeeID'],
        name: params['name'],
        email: params['email'],
             }
            }

  }

}

function getMaterial(params, data) {
  if (params['entity'] === 'book') {
    data['bookRequests'] = {
      create: {
        book: {
          connect: {
            id: params['materialID']
          }
        }
      }
    }
  } else {
    data['boardgameRequests'] = {
      create: {
        boardgame: {
          connect: {
            id: params['materialID']
          }
        }
      }
    }
  }

  return data
}

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const bookQ = async (pc, id) => {
  // TODO: fetch book queue
  // get requests without return_date
  // sort by date
  return await pc.requests.findMany({
    where: {
      return_date: null,
      type: 'Book',
      bookRequests: {
        book_id: id
      }
    },
    include: {
      bookRequests: true,
      boardgameRequests: true,
      user_student: true,
      user_faculty: true,
      user_staff: true,
    },
    orderBy: {
      date: 'asc'
    }
  })
}

const gameQ = async (pc) => {
  // TODO: fetch game queue
  // implement after working boardgame seed
}

const allQ = async (pc) => {
  return await pc.requests.findMany({
    where: {
      return_date: null,
    },
    include: {
      bookRequests: {
        include: {
          book: true
        }
      },
      boardgameRequests: true,
      user_student: true,
      user_faculty: true,
      user_staff: true
    },
    orderBy: {
      date: 'asc'
    }
  })
}

export async function POST(request) {
  const prisma = new PrismaClient()
  const params = await request.json()

  const id = params['id']

  const bq = await bookQ(prisma, id)
  const gq = await gameQ(prisma)
  const allq = await allQ(prisma)

  return NextResponse.json({
    bq,
    allq
  })
}

import { PrismaClient } from '@prisma/client'

const bookQ = async (pc, id) => {
  // TODO: fetch book queue
  // get requests without return_date
  // sort by date
  if (pc == undefined) {
    pc = new PrismaClient()
  }
  return await pc.requests.findMany({
    where: {
      borrow_date: null,
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
      borrow_date: null,
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

const booksIU = async (pc) => {
  const data = await pc.requests.findMany({
    where: {
      return_date: null,
      borrow_date: {
        not: null
      },
      type: 'Book'
    },
    include: {
      bookRequests: {
        include: {
          book: true
        }
      },
    }
  })

  const iu = data.map((r) => (r.bookRequests.book))

  return iu;
}

const giu = async (pc) => {
  // TODO: implement query for Games-In-Use
  // after working boardgame seed
}

export {
  bookQ,
  gameQ,
  allQ,
  booksIU,
  giu
}

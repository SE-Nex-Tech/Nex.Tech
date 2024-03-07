import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

export async function POST(request) {
  const params = await request.json();
  console.log(params);

  let entity = (params['entity'] == 'books') ? prisma.books : prisma.boardgames;

  let result = await entity.findMany({
    where: params['where']
  });

  if (params['search'] != undefined) {

    let re = /[^0-9]+/

    if (re.test(params['contains'])) {
      console.log('has letters')
      const stringAttributes = ['title', 'author', 'edition', 'publication_place', 'publisher']
      const ors = []
      for (let i = 0; i < stringAttributes.length; i++) {
        const clause = {}
        clause[stringAttributes[i]] = {
          contains: params['contains'],
          mode: 'insensitive'
        }
        ors.push(clause)
      }

      result = await entity.findMany({
        where: {
          OR: ors
        }
      })

      return NextResponse.json(result)
    }
    else {
      console.log('has numbers')
      const numAttributes = ['id', 'barcode', 'accession_num']
      const ors = []
      for (let i = 0; i < numAttributes.length; i++) {
        const clause = {}
        clause[numAttributes[i]] = parseInt(params['contains'])
        ors.push(clause)
      }

      result = await entity.findMany({
        where: {
          OR: ors
        }
      })

      return NextResponse.json(result)
    }


  }

  if (params['create'] != undefined) {

    if (params['entity'] == 'books') {
      const conditions = params['data'];
      conditions['copyright_date'] = new Date(conditions['copyright_date']).toISOString();
      // conditions['id'] = Date.now();
      // console.log(conditions)
      result = await entity.create({
        data: conditions
      })

      result['id'] = result['id'].toString();
      console.log(result);
    }
    else {
      const conditions = params['data'];
      conditions['copyright_date'] = new Date(conditions['copyright_date']).toISOString();
      conditions['id'] = Date.now();
      result = await entity.create({
        data: conditions
      })
    }
  }

  else if (params['update'] != undefined) {

    if (params['entity'] == 'books') {
      let filter = params['where']
      let info = params['data']
      info['copyright_date'] = (info['copyright_date'] != undefined) ? new Date(info['copyright_date']).toISOString() : undefined
      result = await entity.update({
        where: filter,
        data: info
      })
    }

    else if (params['entity'] == 'requests') {
      entity = prisma.requests
      console.log('update request')
      let filter = params['where']
      let info = params['data']
      result = await entity.update({
        where: filter,
        data: info
      })
    }

    else {
      let filter = params['where']
      let info = params['data']
      info['copyright_date'] = (info['copyright_date'] != undefined) ? new Date(info['copyright_date']).toISOString() : undefined
      result = await entity.update({
        where: filter,
        data: info
      })
    }
  }

  else if (params['delete'] != undefined) {

    let conditions = params['where']

    result = await entity.deleteMany({
      where: conditions
    })
  }

  else if (params['scanqr'] != undefined) {
    const id = params['id']

    console.log('ACCESSING QR')
    console.log(id)

    const borrowTicket = await prisma.requests.findUnique({
      where: {
        id: id
      }
    })

    const bookReq = await prisma.BookRequest.findUnique({
      where: {
        request_id: borrowTicket.id
      }
    })

    var client;
    switch (borrowTicket.user_type) {
      case 'Student':
        client = await prisma.student.findUnique({
          where: {
            request_id: borrowTicket.id
          }

        });
        break;
      case 'Faculty':
        client = await prisma.faculty.findUnique({
          where: {
            request_id: borrowTicket.id
          }
        });
        break;
      case 'Staff':
        client = await prisma.staff.findUnique({
          where: {
            request_id: borrowTicket.id
          }
        });
        break;
      default:
    }


    // const client = await prisma.student.findUnique({
    //   where: {
    //     request_id: borrowTicket.id
    //   }
    // })

    const book = await prisma.books.findUnique({
      where: {
        id: bookReq.book_id
      }
    })

    result = {
      book,
      client,
      borrowTicket
    }
  }

  prisma.$disconnect();

  return NextResponse.json(result);
}

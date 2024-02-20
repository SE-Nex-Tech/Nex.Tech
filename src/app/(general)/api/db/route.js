import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

export async function POST(request) {
  const params = await request.json();
  console.log(params);

  let entity = (params['entity'] == 'books') ? prisma.books : prisma.games;

  let result = await entity.findMany({
    where: params['where']
  });

  if (params['search'] != undefined) {
    const condition = {}
    condition[params['attribute']] = {
      contains: params['contains'],
      mode: "insensitive"
    }
    result = await entity.findMany({
      where: condition
    });
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
      const result = await entity.update({
        where: filter,
        data: info
      })
    }

    else {
      let filter = params['where']
      let info = params['data']
      info['copyright_date'] = (info['copyright_date'] != undefined) ? new Date(info['copyright_date']).toISOString() : undefined
      const result = await entity.update({
        where: filter,
        data: info
      })
    }
  }

  prisma.$disconnect();

  return NextResponse.json(result);
}

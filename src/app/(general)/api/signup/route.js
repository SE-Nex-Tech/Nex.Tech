import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const { hash } = require('bcrypt');

export async function POST(request) {
  const prisma = new PrismaClient();
  const params = await request.json();

  const pass = await hash(params['password'], 12);

  const find = await prisma.admin.findUnique({
    where: {
      email: params['email']
    }
  })

  if (find != null) {
    return NextResponse.json({
      invalid: 1
    })
  }

  const result = await prisma.admin.create({
    data: {
      email: params['email'],
      fn: params['fname'],
      ln: params['lname'],
      password: pass,
      type: 'admin',
    }
  })

  await prisma.$disconnect()
  return NextResponse.json(result)
}

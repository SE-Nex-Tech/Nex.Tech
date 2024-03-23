import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const { hash } = require('bcrypt');

export async function POST(request) {
  const prisma = new PrismaClient();
  const params = await request.json();

  console.log(params)
  const pass = await hash(params['password'], 12);
  console.log(pass)

  const result = await prisma.admin.upsert({
    where: { email: params['email'] },
    update: {
      email: params['email'],
      name: params['fname'] + ' ' + params['lname'],
      password: pass
    },
    create: {
      email: params['email'],
      name: params['fname'] + ' ' + params['lname'],
      password: pass
    }
  })

  return NextResponse.json(result)
}

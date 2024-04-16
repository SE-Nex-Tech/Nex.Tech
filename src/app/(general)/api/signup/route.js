import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const { hash } = require("bcrypt");
import logger from '@/logger/logger'

export async function POST(request) {
  const prisma = new PrismaClient();
  const params = await request.json();

  const pass = await hash(params["password"], 12);

  const find = await prisma.admin.findUnique({
    where: {
      email: params["email"],
    },
  });

  if (find != null) {
    return NextResponse.json({
      invalid: 1,
    });
  }

  const result = await prisma.admin.create({
    data: {
      email: params["email"],
      fn: params["fname"],
      mn: params["mname"],
      ln: params["lname"],
      password: pass,
      type: "admin",
    },
  });

  logger('Sign up request for ' + params['email'], false)

  await prisma.$disconnect();
  return NextResponse.json(result);
}

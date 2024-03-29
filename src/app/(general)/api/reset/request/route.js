import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const { compare } = require('bcrypt')

export async function POST(request) {
  const prisma = new PrismaClient()
  const params = await request.json()

  const admin = await prisma.admin.findUnique({
    where: {
      email: params['email']
    }
  })

  if (admin == null) {
    return NextResponse.json({
      invalid: 1,
      msg: 'Invalid email'
    })
  }
  const match = await compare(params['oldpass'], admin.password)
  if (!match) {
    return NextResponse.json({
      invalid: 1,
      msg: 'Incorrect password'
    })
  }

  const newPass = await prisma.changepassword.create({
    data: {
      email: admin.email,
      new_pass: params['newpass'],
      date_requested: new Date().toISOString()
    }
  })

  await prisma.$disconnect()
  return NextResponse.json(newPass)
}

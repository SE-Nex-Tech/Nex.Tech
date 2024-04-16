import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const { hash, compare } = require('bcrypt')
import logger from '@/logger/logger'

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

  const newPass = await prisma.changepassword.create({
    data: {
      email: admin.email,
      new_pass: await hash(params['newpass'], 12),
      date_requested: new Date().toISOString()
    }
  })

  logger('New change password request for ' + params['email'], true)

  await prisma.$disconnect()
  return NextResponse.json(newPass)
}

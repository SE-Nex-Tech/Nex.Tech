import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const { hash } = require('bcrypt')

export async function POST(request) {
  const prisma = new PrismaClient()
  const params = await request.json()

  const now = (new Date()).toISOString()

  const pass = await prisma.changepassword.update({
    where: {
      id: params['id']
    },
    data: {
      date_approved: now
    }
  })

  const admin = await prisma.admin.update({
    where: {
      email: pass.email
    },
    data: {
      password: pass.new_pass
    }
  })

  prisma.$disconnect()
  return NextResponse.json(admin)
}

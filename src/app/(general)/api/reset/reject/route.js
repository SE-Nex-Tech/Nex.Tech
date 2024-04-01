import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const prisma = new PrismaClient()
  const params = await request.json()

  const now = (new Date()).toISOString()

  const pass = await prisma.changepassword.update({
    where: {
      id: params['id']
    },
    data: {
      date_rejected: now
    }
  })

  prisma.$disconnect()
  return NextResponse.json(pass)
}

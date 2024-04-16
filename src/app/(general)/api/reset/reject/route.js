import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import logger from '@/logger/logger'

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

  logger('Change password request ID ' + params['id'] + ' rejected', true)

  prisma.$disconnect()
  return NextResponse.json(pass)
}

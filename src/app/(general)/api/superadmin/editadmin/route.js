import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import logger from '@/logger/logger'

export async function POST(request) {
  const prisma = new PrismaClient()
  const params = await request.json()

  const result = await prisma.admin.update({
    where: { id: params['id'] },
    data: {
      fn: params['fn'],
      mn: params['mn'],
      ln: params['ln'],
      email: params['email']
    }
  })

  logger('Edited admin ' + params['id'], true)

  await prisma.$disconnect()
  return NextResponse.json(result)
}

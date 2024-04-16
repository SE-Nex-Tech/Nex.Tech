import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import logger from '@/logger/logger'

export async function POST(request) {
  const prisma = new PrismaClient()
  const params = await request.json()

  const result = await prisma.admin.updateMany({
    where: { id: params['id'] },
    data: { archive: true }
  })

  logger('Archived admin ID ' + params['id'], true)

  await prisma.$disconnect()
  return NextResponse.json(result)
}

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const prisma = new PrismaClient()
  const params = await request.json()

  const result = await prisma.admin.delete({
    where: { id: params['id'] },
  })

  await prisma.$disconnect()
  return NextResponse.json(result)
}

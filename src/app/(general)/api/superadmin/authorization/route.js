import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const prisma = new PrismaClient()
  const params = await request.json()

  const result = await prisma.admin.update({
    where: { id: params['id'] },
    data: { access: params['access'] }
  })

  await prisma.$disconnect()

  return NextResponse.json(result.access)
}

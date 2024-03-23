import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

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

  await prisma.$disconnect()
  return NextResponse.json(result)
}

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const prisma = new PrismaClient()
  const params = await request.json()

  const name = params['fn'] + ' ' + params['mn'] + ' ' + params['ln']

  const result = await prisma.admin.update({
    where: { id: params['id'] },
    data: {
      name: name,
      email: params['email']
    }
  })

  await prisma.$disconnect()
  return NextResponse.json(result)
}

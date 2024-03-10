import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const bookQ = async (pc) => {
  // TODO: fetch book queue
}

const gameQ = async (pc) => {
  // TODO: fetch game queue
}

export async function POST(request) {
  const prisma = new PrismaClient()
  const params = await request.json()

  const bq = await bookQ(prisma)
  const gq = await gameQ(prisma)
}

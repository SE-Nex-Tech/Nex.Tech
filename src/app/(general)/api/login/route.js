import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  const prisma = new PrismaClient()
  const params = await request.json()

  const admin = await prisma.admin.findUnique({
    where: {
      email: params['email']
    }
  })

  return NextResponse.json({
    type: (admin != null) ? admin.type : admin
  })
}

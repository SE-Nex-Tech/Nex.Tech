import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const adminData = (admin) => {

  const admin_data = admin.map((r) => {

    const initials = r.fn[0] + (r.ln != null ? r.ln[0] : '')

    return {
      id: r.id,
      fn: r.fn,
      mn: r.mn,
      ln: r.ln,
      initials,
      access: r.access,
      email: r.email
    }
  })

  return admin_data
}

export async function POST(request) {
  const prisma = new PrismaClient()
  const params = await request.json()

  const admin = await prisma.admin.findMany({
    select: {
      id: true,
      fn: true,
      mn: true,
      ln: true,
      email: true,
      access: true
    }
  })

  const admin_data = adminData(admin)

  /* let s = params['test']
  let re = /(?<fn>[\w\s]+)\s*(?<mn>\w{1}\.)?\s+(?<ln>\w+)/
  let tt = re.exec(s) */

  await prisma.$disconnect()
  return NextResponse.json(admin_data)
}

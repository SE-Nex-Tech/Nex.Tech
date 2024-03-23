import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const adminData = (admin) => {

  const admin_data = admin.map((r) => {
    let re = /(?<fn>[\w\s]+)\s*(?<mn>\w{1}\.)?\s+(?<ln>\w+)/
    // console.log('parsing ' + r.name)
    let match = re.exec(r.name)
    if (match == null) {
      match = {
        groups: {
          fn: r.name,
        }
      }
    }

    const initials = match.groups.fn[0] + (match.groups.ln != undefined ? match.groups.ln[0] : '')

    return {
      id: r.id,
      fn: match.groups.fn,
      mn: match.groups.mn,
      ln: match.groups.ln,
      initials,
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
      name: true,
      email: true
    }
  })

  const admin_data = adminData(admin)

  /* let s = params['test']
  let re = /(?<fn>[\w\s]+)\s*(?<mn>\w{1}\.)?\s+(?<ln>\w+)/
  let tt = re.exec(s) */

  await prisma.$disconnect()
  return NextResponse.json(admin_data)
}

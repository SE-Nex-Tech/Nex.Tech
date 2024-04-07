import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { credentials } from '@/data/mail'
const nodemailer = require('nodemailer')

export async function POST(request) {
  const params = await request.json()

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: credentials
  })

  transporter.sendMail({
    to: params['to'],
    subject: 'CICS BiblioTechAI Reservation',
    text: params['text']
  })

  return NextResponse.json({
    done: 1
  })
}

import { NextRequest, NextResponse } from "next/server";
import { borrow } from './borrow.js';

export async function GET(request) {
  const params = Object.fromEntries(await request.nextUrl.searchParams);
  console.log("Borrow/route.js GET params -----------------------------");
  console.log(params);
  return Response.redirect(new URL('/books', request.url));
}

export async function POST(request) {
  // const params = Object.fromEntries(await request.nextUrl.searchParams);
  const params = await request.json();

  console.log("Borrow/route.js POST params -----------------------------");
  console.log(params);
  
  // TODO: create reservation at db
  console.log("Book Reserved");
  // console.log(await borrow(params));
  const result = await borrow(params);
  // return Response.redirect(new URL('/books', request.url));
  return NextResponse.json(result);
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  const params = Object.fromEntries(await request.nextUrl.searchParams);

  console.log(params);
  return new Response("hello world");
}

export async function POST(request) {
  // const params = Object.fromEntries(await request.nextUrl.searchParams);
  const params = await request.json();

  console.log("Borrow/route.js POST params -----------------------------");
  console.log(params);
  
  // TODO: create reservation at db
  console.log("Book Reserved");
  return Response.redirect(new URL('/books', request.url));
}

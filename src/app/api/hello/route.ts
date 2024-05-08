// app/api/hello/route.js
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: 'Hello from Next.js 14' });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  return NextResponse.json({ received: data });
}

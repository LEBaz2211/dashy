import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title } = await req.json();
  const userEmail = session.user.email;

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const dashboard = await prisma.dashboard.create({
      data: {
        title,
        userId: user.id,
      },
    });

    return NextResponse.json(dashboard);
  } catch (error) {
    console.error("Error creating dashboard:", error);
    return NextResponse.json({ error: "Unable to create dashboard" }, { status: 500 });
  }
}

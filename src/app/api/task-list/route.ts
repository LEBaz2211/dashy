import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { title, dashboardId } = await req.json();

  if (!title || !dashboardId) {
    return NextResponse.json(
      { error: "Title and DashboardId are required" },
      { status: 400 }
    );
  }

  const taskList = await prisma.taskList.create({
    data: {
      title,
      dashboardId,
    },
  });

  return NextResponse.json(taskList);
}

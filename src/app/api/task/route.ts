import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { title, taskListId } = await req.json();

  if (!title || !taskListId) {
    return NextResponse.json(
      { error: "Title and TaskListId are required" },
      { status: 400 }
    );
  }

  const task = await prisma.task.create({
    data: {
      title,
      taskListId,
    },
  });

  return NextResponse.json(task);
}

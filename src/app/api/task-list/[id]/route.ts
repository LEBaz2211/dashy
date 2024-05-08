import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const taskListId = parseInt(params.id, 10);
  const { title } = await req.json();

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const updatedTaskList = await prisma.taskList.update({
    where: { id: taskListId },
    data: { title },
  });

  return NextResponse.json(updatedTaskList);
}

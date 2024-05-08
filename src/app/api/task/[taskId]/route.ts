import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const taskId = parseInt(params.taskId, 10);
  const { completed } = await req.json();

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { completed },
  });

  return NextResponse.json(updatedTask);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const taskId = parseInt(params.taskId, 10);

  await prisma.task.delete({
    where: { id: taskId },
  });

  return NextResponse.json({ message: "Task List deleted" });
}

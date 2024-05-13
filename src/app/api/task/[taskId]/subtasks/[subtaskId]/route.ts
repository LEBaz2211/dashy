import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { taskId: string; subtaskId: string } }) {
  const subtaskId = parseInt(params.subtaskId, 10);
  const { completed } = await req.json();

  const updatedSubtask = await prisma.subtask.update({
    where: { id: subtaskId },
    data: { completed },
  });

  return NextResponse.json(updatedSubtask);
}

export async function DELETE(req: NextRequest, { params }: { params: { taskId: string; subtaskId: string } }) {
  const subtaskId = parseInt(params.subtaskId, 10);

  await prisma.subtask.delete({
    where: { id: subtaskId },
  });

  return NextResponse.json({ message: "Subtask deleted" });
}



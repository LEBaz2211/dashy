import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const taskId = parseInt(params.taskId, 10);

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      tags: true,
      subtasks: true,
    },
  });

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json(task);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const taskId = parseInt(params.taskId, 10);
  const { title, completed, type, recipient, emailBody, courseSummary, dueDate, reminder, notes } = await req.json();

  const task = await prisma.task.update({
    where: { id: taskId },
    data: {
      title,
      completed,
      type,
      recipient,
      emailBody,
      courseSummary,
      dueDate: dueDate ? new Date(dueDate) : null,
      reminder: reminder ? new Date(reminder) : null,
      notes,
    },
  });

  return NextResponse.json(task);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const taskId = parseInt(params.taskId, 10);

  // Delete the associated tags explicitly
  await prisma.$executeRaw`DELETE FROM _TagToTask WHERE B = ${taskId}`;

  // Delete associated subtasks explicitly
  await prisma.subtask.deleteMany({
    where: {
      taskId,
    },
  });

  // Finally, delete the task itself
  await prisma.task.delete({
    where: { id: taskId },
  });

  return NextResponse.json({ message: "Task and associated tags deleted" });
}

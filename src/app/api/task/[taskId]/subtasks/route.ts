import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { taskId: string } }) {
  const taskId = parseInt(params.taskId, 10);
  const { title } = await req.json();

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const subtask = await prisma.subtask.create({
    data: { title, taskId, completed: false },
  });

  return NextResponse.json(subtask);
}

export async function GET(req: NextRequest, { params }: { params: { taskId: string } }) {
  const taskId = parseInt(params.taskId, 10);
  const subtasks = await prisma.subtask.findMany({
    where: { taskId },
  });

  return NextResponse.json(subtasks);
}

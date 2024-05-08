import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const taskId = parseInt(params.id, 10);
  const { completed } = await req.json();

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { completed },
  });

  return NextResponse.json(updatedTask);
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: {
  taskId: string;
} }) {
  const taskId = parseInt(params.taskId, 10);
  const { tagName } = await req.json();

  if (!tagName) {
    return NextResponse.json({ error: "Tag name is required" }, { status: 400 });
  }

  const existingTag = await prisma.tag.findFirst({
    where: { name: tagName },
  });

  let tag = existingTag;
  if (!existingTag) {
    tag = await prisma.tag.create({ data: { name: tagName } });
  }

  await prisma.task.update({
    where: { id: taskId },
    data: { tags: { connect: { id: tag!.id } } },
  });

  return NextResponse.json(tag);
}

export async function DELETE(req: NextRequest, { params }: { params: {
  taskId: string;
} }) {
  const taskId = parseInt(params.taskId, 10);
  const { tagName } = await req.json();

  const existingTag = await prisma.tag.findFirst({
    where: { name: tagName },
  });

  if (!existingTag) {
    return NextResponse.json({ error: "Tag not found" }, { status: 404 });
  }

  await prisma.task.update({
    where: { id: taskId },
    data: { tags: { disconnect: { id: existingTag.id } } },
  });

  return NextResponse.json({ message: "Tag removed" });
}

export async function GET(req: NextRequest, { params }: { params: {
  taskId: string;
} }) {
  const taskId = parseInt(params.taskId, 10);
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { tags: true },
  });

  if (!task) {
    return NextResponse.error();
  } else {
    return NextResponse.json(task.tags);
  }
}
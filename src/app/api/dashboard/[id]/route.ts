import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const dashboardId = parseInt(params.id, 10);
  const { title } = await req.json();

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const updatedDashboard = await prisma.dashboard.update({
    where: { id: dashboardId },
    data: { title },
  });

  return NextResponse.json(updatedDashboard);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const dashboardId = parseInt(params.id, 10);

  await prisma.dashboard.delete({
    where: { id: dashboardId },
  });

  return NextResponse.json({ message: "Dashboard deleted" });
}

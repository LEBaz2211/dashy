import { NextRequest, NextResponse } from "next/server";
import aiPrisma from "@/lib/aiPrisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const taskId = parseInt(params.taskId, 10);

  const aiTasks = await aiPrisma.aITask.findMany({
    where: {
      related_task_id: {
        contains: taskId.toString(),
      }
    }
  });

  if (!aiTasks) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json(aiTasks);
}

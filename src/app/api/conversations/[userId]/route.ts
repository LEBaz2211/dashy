// src/app/api/conversations/[userId]/route.ts
import { NextResponse } from "next/server";
import aiPrisma from "@/lib/aiPrisma";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const userId = params.userId;

  try {
    const conversations = await aiPrisma.conversation.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        // Assuming a summary or createdAt field exists for a brief display
        created_at: true,
      },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return new NextResponse("Error fetching conversations", { status: 500 });
  }
}

import { NextResponse } from "next/server";
import aiPrisma from "@/lib/aiPrisma";

export async function GET(request: Request, { params }: { params: { userId: string; conversationId: string } }) {
  const { userId, conversationId } = params;

  try {
    const conversation = await aiPrisma.conversation.findUnique({
      where: {
        id: parseInt(conversationId),
        user_id: userId,
      },
      select: {
        conversation: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    // console.log("Conversation:", conversation.conversation);

    return NextResponse.json(conversation.conversation);
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return new NextResponse("Error fetching conversation", { status: 500 });
  }
}

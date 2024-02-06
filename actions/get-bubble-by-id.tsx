import db from "@/lib/db";
import { BubbleWithMembers } from "@/types/prisma";

export default async function getBubbleById(bubbleId: string) {
  try {
    const bubble: BubbleWithMembers | null = await db.bubble.findUnique({
      where: {
        id: bubbleId,
      },
      include: {
        members: true,
        owner: true,
      },
    });

    if (!bubble) {
      return null;
    }

    return bubble;
  } catch (error) {
    return null;
  }
}

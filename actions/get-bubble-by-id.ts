import currentProfile from "@/lib/current-profile";
import db from "@/lib/db";
import {
  BubbleAccessDeniedError,
  BubbleNotFoundError,
} from "@/lib/exceptions/exceptions";
import { BubbleWithMembers } from "@/types/prisma";

export default async function getBubbleById(bubbleId: string) {
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
    throw new BubbleNotFoundError();
  }

  return bubble;
}

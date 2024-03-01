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

  if (bubble.accessType === "PRIVATE") {
    const profile = await currentProfile();

    if (!profile) {
      throw new BubbleAccessDeniedError();
    }
    const isMember =
      bubble.members.some((member) => member.profileId === profile.id) ||
      bubble.ownerId === profile.id;

    if (!isMember) {
      throw new BubbleAccessDeniedError();
    }
  }

  return bubble;
}

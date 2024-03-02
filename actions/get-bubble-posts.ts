import db from "@/lib/db";
import { ServerError } from "@/lib/exceptions/exceptions";
import { PostWithProfile } from "@/types/prisma";

export default async function getBubblePosts(bubbleId: string) {
  try {
    const posts: PostWithProfile[] | null = await db.post.findMany({
      where: {
        bubbleId: bubbleId,
      },
      include: {
        owner: true,
      },
    });

    return posts;
  } catch (error) {
    throw new ServerError();
  }
}

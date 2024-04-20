import db from "@/lib/db";
import { ServerError } from "@/lib/exceptions/exceptions";
import { PostWithProfile } from "@/types/prisma";

export default async function getBubblePosts(
  bubbleId: string,
  sort: "hot" | "new" | null = null
) {
  try {
    let posts: PostWithProfile[] = [];
    if (!sort) {
      posts = await db.post.findMany({
        where: {
          bubbleId: bubbleId,
        },
        include: {
          owner: true,
          likes: true,
        },
      });
    }

    if (sort === "new") {
      posts = await db.post.findMany({
        where: {
          bubbleId: bubbleId,
        },
        include: {
          owner: true,
          likes: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    if (sort === "hot") {
      posts = await db.post.findMany({
        where: {
          bubbleId: bubbleId,
        },
        include: {
          owner: true,
          likes: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }
    return posts;
  } catch (error) {
    throw new ServerError();
  }
}

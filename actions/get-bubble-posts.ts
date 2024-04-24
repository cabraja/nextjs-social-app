import db from "@/lib/db";
import { ServerError } from "@/lib/exceptions/exceptions";
import { PostSort } from "@/types/posts";
import { PostWithProfile } from "@/types/prisma";

export default async function getBubblePosts(
  bubbleId: string,
  sort: PostSort | null = null
) {
  try {
    let posts: PostWithProfile[] = [];

    if (!sort || sort == "new") {
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
      await db.post.findMany({
        where: {
          bubbleId: bubbleId,
        },
        include: {
          owner: true,
          likes: true,
        },
        orderBy: {
          likes: {
            _count: "desc",
          },
        },
      });
    }

    return posts;
  } catch (error) {
    throw new ServerError();
  }
}

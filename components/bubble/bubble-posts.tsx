import getBubblePosts from "@/actions/get-bubble-posts";
import CreatePostButton from "../buttons/create-post-button";
import BubblePost from "./post/bubble-post";
import { PostWithProfile } from "@/types/prisma";
import { PostSort } from "@/types/posts";
import currentProfile from "@/lib/current-profile";

type BubblePostsProps = {
  bubbleId: string;
  sort?: PostSort;
};

async function BubblePosts({ bubbleId, sort }: BubblePostsProps) {
  const profile = await currentProfile();
  let posts: PostWithProfile[];
  if (!sort) {
    posts = await getBubblePosts(bubbleId);
  } else {
    posts = await getBubblePosts(bubbleId, sort);
  }

  if (posts.length === 0) {
    return (
      <div className="w-full mt-5">
        <div className="w-4/5 md:w-3/5 mx-auto py-3 px-5 text-center">
          <div className="flex flex-col items-center justify-center gap-y-3">
            <p>This bubble doesn't have any posts.</p>
            <CreatePostButton bubbleId={bubbleId} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-5">
      <div className="w-full flex flex-col gap-y-5">
        {posts.map((post) => (
          <BubblePost key={post.id} post={post} profile={profile} />
        ))}
      </div>
    </div>
  );
}

export default BubblePosts;

import getBubblePosts from "@/actions/get-bubble-posts";
import CreatePostButton from "../buttons/create-post-button";

type BubblePostsProps = {
  bubbleId: string;
};

async function BubblePosts({ bubbleId }: BubblePostsProps) {
  const posts = await getBubblePosts(bubbleId);

  if (posts.length !== 0) {
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
}

export default BubblePosts;

import getBubbleById from "@/actions/get-bubble-by-id";
import getBubblePosts from "@/actions/get-bubble-posts";
import BubbleHeader from "@/components/bubble/bubble-header/bubble-header";
import BubbleNav from "@/components/bubble/bubble-nav/bubble-nav";
import BubblePosts from "@/components/bubble/bubble-posts";
import currentProfile from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs/server";

export async function BubblePage({ params }: { params: { bubbleId: string } }) {
  const bubble = await getBubbleById(params.bubbleId);
  const posts = await getBubblePosts(params.bubbleId);
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  return (
    <div className="w-full">
      <BubbleHeader bubble={bubble} postCount={posts.length} />

      <div className="flex gap-x-6 w-full mt-10">
        <div className="w-full">
          <BubbleNav bubble={bubble} profileId={profile?.id} />
          <BubblePosts bubbleId={params.bubbleId} posts={posts} />
        </div>
        <div className="w-1/4 bg-zinc-500 rounded-lg h-fit py-3 px-4">
          <h6 className="border-b-[1px] mb-1 border-neutral-400 text-neutral-300">
            About
          </h6>
          <p className="text-xs dark:text-neutral-300">{bubble.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BubblePage;

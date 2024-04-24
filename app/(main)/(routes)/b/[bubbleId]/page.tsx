import getBubbleById from "@/actions/get-bubble-by-id";
import BubbleHeader from "@/components/bubble/bubble-header/bubble-header";
import BubbleNav from "@/components/bubble/bubble-nav/bubble-nav";
import BubblePosts from "@/components/bubble/bubble-posts";
import { Skeleton } from "@/components/ui/skeleton";
import currentProfile from "@/lib/current-profile";
import { PostSort } from "@/types/posts";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export async function BubblePage({
  params,
  searchParams,
}: {
  params: { bubbleId: string };
  searchParams: { sort: PostSort | undefined };
}) {
  const profile = await currentProfile();
  if (!profile) {
    redirect("/create-profile");
  }

  const bubble = await getBubbleById(params.bubbleId);

  return (
    <div className="w-full">
      <BubbleHeader bubble={bubble} postCount={0} />

      <div className="flex gap-x-6 w-full mt-10">
        <div className="w-full">
          <BubbleNav bubble={bubble} profileId={profile?.id} />
          <Suspense key={searchParams.sort} fallback={<Loading />}>
            <BubblePosts bubbleId={params.bubbleId} sort={searchParams.sort} />
          </Suspense>
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

function Loading() {
  return (
    <div className="flex flex-col w-full gap-y-5 py-6">
      <article className="p-4">
        <div className="flex items-center gap-x-3 my-3">
          <Skeleton className="w-[30px] h-[30px] rounded-full" />
          <Skeleton className="w-[40%] h-[30px]" />
        </div>

        <Skeleton className="w-full h-[200px]" />
      </article>

      <article className="p-4">
        <div className="flex items-center gap-x-3 my-3">
          <Skeleton className="w-[30px] h-[30px] rounded-full" />
          <Skeleton className="w-[40%] h-[30px]" />
        </div>

        <Skeleton className="w-full h-[180px]" />
      </article>
    </div>
  );
}

export default BubblePage;

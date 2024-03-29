import { BubbleWithMembers } from "@/types/prisma";
import { currentUser } from "@clerk/nextjs";
import BubbleHeaderImageAuth from "./bubble-header-image-auth";
import BubbleHeaderImage from "./bubble-header-image";
import BubbleHeaderCoverButton from "./bubble-header-cover-button";
import { cn } from "@/lib/utils";

type BubbleHeaderProps = {
  bubble: BubbleWithMembers;
  postCount: number;
};

export async function BubbleHeader({ bubble, postCount }: BubbleHeaderProps) {
  const user = await currentUser();
  return (
    <div
      style={{ backgroundImage: `url(${bubble?.coverUrl})` || "none" }}
      className="w-full bg-cover bg-center rounded-lg relative bg-zinc-500"
    >
      <div
        className={cn(
          "w-full h-full flex rounded-lg pb-3 px-5 relative",
          bubble?.coverUrl && "bg-neutral-900/70",
          !bubble?.coverUrl && "bg-neutral-900/90"
        )}
      >
        {bubble?.owner.userId === user?.id && (
          <BubbleHeaderCoverButton bubble={bubble} />
        )}

        <div
          className="
        group
        aspect-square
        h-[16vh]
        w-[16vh]
        relative
        overflow-hidden
        rounded-full
        translate-y-8
        border-2
        bg-slate-500
        "
        >
          {bubble?.owner.userId === user?.id ? (
            <BubbleHeaderImageAuth bubble={bubble} />
          ) : (
            <BubbleHeaderImage bubble={bubble} />
          )}
        </div>

        <div className="flex-1 flex flex-col px-4 justify-center gap-y-2">
          <h3 className="font-semibold text-3xl">
            <span className="text-neutral-400 font-normal text-lg">b/ </span>
            {bubble?.name}
          </h3>

          <div className="flex items-center gap-x-4">
            <div className="flex flex-col">
              <span className="text-base">{bubble?.members.length}</span>
              <p className="text-neutral-400 text-sm">Members</p>
            </div>

            <div className="flex flex-col">
              <span className="text-base">{postCount}</span>
              <p className="text-neutral-400 text-sm">
                {postCount === 1 ? "Post" : "Posts"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BubbleHeader;

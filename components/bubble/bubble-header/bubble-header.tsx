import { BubbleWithMembers } from "@/types/prisma";
import { currentUser } from "@clerk/nextjs";
import { ImagePlus } from "lucide-react";
import BubbleHeaderImageAuth from "./bubble-header-image-auth";
import BubbleHeaderImage from "./bubble-header-image";

type BubbleHeaderProps = {
  bubble: BubbleWithMembers;
};

export async function BubbleHeader({ bubble }: BubbleHeaderProps) {
  const user = await currentUser();
  return (
    <div
      style={{ backgroundImage: `src(${bubble?.coverUrl})` || "none" }}
      className="w-full bg-cover rounded-lg relative bg-zinc-500"
    >
      <div className="w-full h-full flex rounded-lg bg-neutral-900/90 pb-3 px-5 relative">
        {bubble?.owner.userId === user?.id && (
          <div className="absolute top-2 right-3 rounded-full bg-slate-500 p-2 cursor-pointer hover:opacity-65 transition">
            <ImagePlus className="w-4 h-4 text-slate-400" />
          </div>
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
              <span className="text-base">14</span>
              <p className="text-neutral-400 text-sm">Posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BubbleHeader;

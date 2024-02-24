"use client";

import useModal from "@/hooks/use-modal";
import { BubbleWithMembers } from "@/types/prisma";
import { BadgePlus, Flame, PlusCircle } from "lucide-react";

type BubbleNavProps = {
  bubble: BubbleWithMembers;
};

function BubbleNav({ bubble }: BubbleNavProps) {
  const { onOpen } = useModal();

  return (
    <div className="w-full flex rounded-lg bg-zinc-900 h-fit py-3 px-4 flex-1">
      <div className="flex flex-1 items-center gap-x-4 w-full">
        <div className="flex items-center rounded-full font-light text-sm bg-zinc-800 cursor-pointer px-3 py-1 hover:bg-zinc-600 transition gap-x-1">
          <Flame />
          <p>Hot</p>
        </div>

        <div className="flex items-center rounded-full font-light text-sm bg-zinc-800 cursor-pointer px-3 py-1 hover:bg-zinc-600 transition gap-x-1">
          <BadgePlus />
          <p>New</p>
        </div>
      </div>

      <div
        onClick={() => {
          onOpen("createPost", { bubbleId: bubble.id });
        }}
        className="flex justify-center px-3 py-1 gap-x-1 text-sm font-medium cursor-pointer bg-neutral-100 rounded-full items-center text-black hover:bg-zinc-400 transition"
      >
        <PlusCircle />
        <p>New Post</p>
      </div>
    </div>
  );
}

export default BubbleNav;

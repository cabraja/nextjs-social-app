"use client";

import useModal from "@/hooks/use-modal";
import { BubbleWithMembers } from "@/types/prisma";
import { BadgePlus, Flame, PlusCircle, UserPlus } from "lucide-react";
import Link from "next/link";

type BubbleNavProps = {
  bubble: BubbleWithMembers;
  profileId: string;
};

function BubbleNav({ bubble, profileId }: BubbleNavProps) {
  const { onOpen } = useModal();

  const canUserPost =
    bubble.accessType === "PUBLIC" ||
    (bubble.accessType === "PRIVATE" &&
      bubble.members.some((member) => member.profileId === profileId)) ||
    bubble.ownerId === profileId;
  const canUserJoin =
    bubble.accessType === "PRIVATE" &&
    !bubble.members.some((member) => member.profileId === profileId) &&
    bubble.ownerId !== profileId;

  return (
    <div className="w-full flex rounded-lg bg-zinc-900 h-fit py-3 px-4 flex-1">
      <div className="flex flex-1 items-center gap-x-4 w-full">
        <Link
          href={{
            pathname: `/b/${bubble.id}`,
            query: { sort: "hot" },
          }}
        >
          <div className="flex items-center rounded-full font-light text-sm bg-zinc-800 cursor-pointer px-3 py-1 hover:bg-zinc-600 transition gap-x-1">
            <Flame />
            <p>Hot</p>
          </div>
        </Link>

        <Link
          href={{
            pathname: `/b/${bubble.id}`,
            query: { sort: "new" },
          }}
        >
          <div className="flex items-center rounded-full font-light text-sm bg-zinc-800 cursor-pointer px-3 py-1 hover:bg-zinc-600 transition gap-x-1">
            <BadgePlus />
            <p>New</p>
          </div>
        </Link>
      </div>

      {canUserPost && (
        <div
          onClick={() => {
            onOpen("createPost", { bubbleId: bubble.id });
          }}
          className="flex justify-center px-3 py-1 gap-x-1 text-sm font-medium cursor-pointer bg-neutral-100 rounded-full items-center text-black hover:bg-zinc-400 transition"
        >
          <PlusCircle />
          <p>New Post</p>
        </div>
      )}

      {canUserJoin && (
        <div
          onClick={() => {}}
          className="flex justify-center px-3 py-1 gap-x-1 text-sm font-medium cursor-pointer bg-transparent hover:bg-white rounded-full items-center text-white hover:text-black transition border border-white"
        >
          <UserPlus />
          <p>Become a member</p>
        </div>
      )}
    </div>
  );
}

export default BubbleNav;

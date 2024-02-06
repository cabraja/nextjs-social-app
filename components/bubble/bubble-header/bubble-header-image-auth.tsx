"use client";

import useModal from "@/hooks/use-modal";
import { BubbleWithMembers } from "@/types/prisma";
import { ImagePlus } from "lucide-react";
import Image from "next/image";

type BubbleHeaderImageAuthProps = {
  bubble: BubbleWithMembers;
};

function BubbleHeaderImageAuth({ bubble }: BubbleHeaderImageAuthProps) {
  const { onOpen } = useModal();
  return (
    <>
      {bubble?.imageUrl ? (
        <Image
          fill
          src={bubble?.imageUrl}
          alt={bubble?.name}
          className="object-cover h-full w-full group-hover:scale-110 transition"
        />
      ) : (
        <div
          onClick={() => onOpen("addBubbleImage")}
          className="cursor-pointer h-full w-full object-cover bg-slate-500 flex items-center justify-center transition group-hover:opacity-65"
        >
          <ImagePlus className="w-8 h-8 text-slate-400" />
        </div>
      )}
    </>
  );
}

export default BubbleHeaderImageAuth;

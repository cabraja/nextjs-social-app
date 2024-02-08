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
        <>
          <Image
            fill
            src={bubble?.imageUrl}
            alt={bubble?.name}
            sizes="(min-width: 800px) 30vw, (max-width: 799px) 45vw"
            className="object-cover h-full w-full"
          />

          <div
            onClick={() => {
              if (bubble.imageUrl) {
                onOpen("addBubbleImage", {
                  bubbleId: bubble.id,
                  fileUrl: bubble.imageUrl,
                });
              } else {
                onOpen("addBubbleImage", {
                  bubbleId: bubble.id,
                });
              }
            }}
            className="absolute opacity-0 group-hover:opacity-100 transition top-0 h-full w-full rounded-full bg-neutral-700/80 flex items-center justify-center cursor-pointer"
          >
            <ImagePlus className="w-8 h-8 text-slate-400" />
          </div>
        </>
      ) : (
        <div
          onClick={() => onOpen("addBubbleImage", { bubbleId: bubble.id })}
          className="cursor-pointer h-full w-full object-cover bg-slate-500 flex items-center justify-center transition group-hover:opacity-65"
        >
          <ImagePlus className="w-8 h-8 text-slate-400" />
        </div>
      )}
    </>
  );
}

export default BubbleHeaderImageAuth;

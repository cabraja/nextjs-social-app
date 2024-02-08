"use client";
import useModal from "@/hooks/use-modal";
import { BubbleWithMembers } from "@/types/prisma";
import { ImagePlus } from "lucide-react";

type BubbleHeaderCoverButtonProps = {
  bubble: BubbleWithMembers;
};

function BubbleHeaderCoverButton({ bubble }: BubbleHeaderCoverButtonProps) {
  const { onOpen } = useModal();
  return (
    <div
      onClick={() => {
        if (bubble.coverUrl) {
          onOpen("addBubbleCover", {
            bubbleId: bubble.id,
            fileUrl: bubble.coverUrl,
          });
        } else {
          onOpen("addBubbleCover", {
            bubbleId: bubble.id,
          });
        }
      }}
      className="absolute top-2 right-3 rounded-full bg-slate-500 p-2 cursor-pointer hover:opacity-65 transition"
    >
      <ImagePlus className="w-4 h-4 text-slate-400" />
    </div>
  );
}

export default BubbleHeaderCoverButton;

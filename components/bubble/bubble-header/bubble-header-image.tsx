import { BubbleWithMembers } from "@/types/prisma";
import Image from "next/image";

type BubbleHeaderImageProps = {
  bubble: BubbleWithMembers;
};

function BubbleHeaderImage({ bubble }: BubbleHeaderImageProps) {
  return (
    <>
      {bubble?.imageUrl ? (
        <Image
          fill
          src={bubble?.imageUrl}
          alt={bubble?.name}
          sizes="(min-width: 800px) 30vw, (max-width: 799px) 45vw"
          className="object-cover h-full w-full group-hover:scale-110 transition"
        />
      ) : (
        <div className="h-full w-full object-cover bg-slate-400 flex items-center justify-center">
          <p className="text-xs text-center text-slate-300">
            Bubble has no image.
          </p>
        </div>
      )}
    </>
  );
}

export default BubbleHeaderImage;

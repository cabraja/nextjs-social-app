"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import useModal from "@/hooks/use-modal";

type CreatePostButtonProps = {
  bubbleId: string;
};

const CreatePostButton = ({ bubbleId }: CreatePostButtonProps) => {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen("createPost", { bubbleId: bubbleId })}
      className="rounded-full font-semibold"
    >
      Be the first one to post <PlusCircle className="ms-1" />
    </Button>
  );
};

export default CreatePostButton;

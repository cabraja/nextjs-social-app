"use client";

import { Button } from "@/components/ui/button";
import { PostWithProfile } from "@/types/prisma";
import { Profile } from "@prisma/client";
import { ThumbsUp } from "lucide-react";

type PostFooterProps = {
  post: PostWithProfile;
  profile: Profile;
};

function PostFooter({ post, profile }: PostFooterProps) {
  const isPostLikedByCurrentUser = post.likes.find(
    (like) => like.profileId === profile.id
  );
  const likeCount = post.likes.length;

  const likePost = async () => {};

  const dislikePost = async () => {};

  return (
    <div className="w-full mt-2">
      <div className="flex items-center">
        <Button variant={"ghost"} className="rounded-full mr-2 w-fit h-fit">
          {isPostLikedByCurrentUser && (
            <ThumbsUp fill="#94a3b8" className="w-5 h-5" />
          )}
          {!isPostLikedByCurrentUser && <ThumbsUp className="w-5 h-5" />}
        </Button>

        {likeCount === 0 && (
          <span className="text-neutral-100 text-sm">
            Be the first to like this post!
          </span>
        )}
        {likeCount === 1 && (
          <span className="text-neutral-100 text-sm">1 like</span>
        )}
        {likeCount > 1 && (
          <span className="text-neutral-100 text-sm">{likeCount} likes</span>
        )}
      </div>
    </div>
  );
}

export default PostFooter;

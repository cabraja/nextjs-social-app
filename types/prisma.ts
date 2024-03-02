import { Bubble, Member, Post, Profile } from "@prisma/client";

export type BubbleWithMembers = Bubble & {
  members: Member[];
  owner: Profile;
};

export type PostWithProfile = Post & {
  owner: Profile;
};

import { Bubble, Member, Profile } from "@prisma/client";

export type BubbleWithMembers = Bubble & {
  members: Member[];
  owner: Profile;
};

import { redirectToSignIn, currentUser } from "@clerk/nextjs";
import db from "@/lib/db";
import { User } from "@clerk/nextjs/server";

export const createProfile = async (user: User) => {
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};

import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { Profile } from "@prisma/client";

const currentProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  let profile: Profile | null = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!profile) {
    return null;
  }

  return profile;
};

export default currentProfile;

import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { createProfile } from "./create-profile";

const currentProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  let profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!profile) {
    profile = await createProfile(user);
  }

  return profile;
};

export default currentProfile;

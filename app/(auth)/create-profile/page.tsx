import CreateProfile from "@/components/modals/create-profile";
import { currentUser, redirectToSignIn } from "@clerk/nextjs/server";

async function CreateProfilePage() {
  const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
  return <CreateProfile />;
}

export default CreateProfilePage;

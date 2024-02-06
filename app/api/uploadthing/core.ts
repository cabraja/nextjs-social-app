import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const authUser = () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return { id: userId };
};

export const ourFileRouter = {
  bubbleImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => authUser())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

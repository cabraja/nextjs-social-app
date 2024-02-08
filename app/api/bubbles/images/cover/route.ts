import currentProfile from "@/lib/current-profile";
import db from "@/lib/db";

export async function PATCH(request: Request) {
  const profile = await currentProfile();

  if (!profile) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { fileUrl, bubbleId } = await request.json();

  try {
    await db.bubble.update({
      where: {
        id: bubbleId,
      },
      data: {
        coverUrl: fileUrl,
      },
    });

    return new Response("Success", { status: 201 });
  } catch (error) {
    return new Response("Error occured on the server.", { status: 500 });
  }
}

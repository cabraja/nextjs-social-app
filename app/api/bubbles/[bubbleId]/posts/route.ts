import currentProfile from "@/lib/current-profile";
import db from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { bubbleId: string } }
) {
  const profile = await currentProfile();

  if (!profile) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { bubbleId } = params;

  const bubble = await db.bubble.findUnique({
    where: {
      id: bubbleId,
    },
  });

  if (!bubble) {
    return new Response("Invalid Bubble ID", { status: 400 });
  }

  const { title, textContent, codeContent } = await request.json();

  if (!title) {
    return new Response("No tittle was provided.", { status: 400 });
  }

  if (!textContent) {
    return new Response("No text content was provided.", { status: 400 });
  }

  try {
    const post = await db.post.create({
      data: {
        title: title,
        textContent: textContent,
        codeContent: codeContent,
        bubbleId: bubbleId,
        profileId: profile.id,
      },
    });

    return Response.json(post, { status: 201 });
  } catch (error: any) {
    return new Response("An error occured on the server.", { status: 500 });
  }
}

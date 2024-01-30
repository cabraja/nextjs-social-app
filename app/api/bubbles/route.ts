import currentProfile from "@/lib/currentProfile";
import { validateNewBubble } from "@/lib/valdiators";
import db from "@/lib/db";

export async function POST(request: Request) {
  const profile = await currentProfile();

  if (!profile) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { name, description, accessType } = await request.json();

  if (!validateNewBubble({ name, description, accessType })) {
    return new Response("Invalid data", { status: 400 });
  }

  const existingName = await db.bubble.findFirst({
    where: {
      name: name,
    },
  });

  if (existingName) {
    return new Response("Bubble name is already taken.", { status: 400 });
  }

  try {
    const bubble = await db.bubble.create({
      data: {
        name,
        description,
        accessType,
        ownerId: profile.id,
      },
    });

    return Response.json({ bubble }, { status: 201 });
  } catch (error) {
    return new Response("Error occured on the server.", { status: 500 });
  }
}

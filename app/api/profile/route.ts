import db from "@/lib/db";

export async function POST(request: Request) {
  const { user, username } = await request.json();

  const existingUsername = await db.profile.findUnique({
    where: {
      username: username,
    },
  });

  if (existingUsername) {
    return new Response("Username is already taken", { status: 400 });
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      username: username,
    },
  });

  return Response.json(newProfile, { status: 201 });
}

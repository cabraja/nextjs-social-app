import db from "@/lib/db";

export default async function getTopics() {
  try {
    return await db.topic.findMany();
  } catch (error) {
    return [];
  }
}

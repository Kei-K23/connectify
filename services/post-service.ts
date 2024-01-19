import { db } from "@/lib/db";

export async function getAllPosts() {
  try {
    return await db.post.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        profile: true,
      },
    });
  } catch (e: any) {
    throw new Error("Internal server error!");
  }
}

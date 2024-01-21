import { db } from "@/lib/db";

export async function getAllReplayForPost(postId: string) {
  try {
    return await db.reply.findMany({
      where: {
        postId,
      },
      include: {
        profile: {
          include: {
            followers: true,
            followings: true,
          },
        },
      },
    });
  } catch (e: any) {
    throw new Error("Internal server error!");
  }
}

import { db } from "@/lib/db";
import { getCurrentUser } from "./user-service";

export async function getAllReplayForPost(postId: string) {
  try {
    const profile = await getCurrentUser();
    return await db.reply.findMany({
      where: {
        postId,
        profile: {
          NOT: {
            OR: [
              {
                blockings: {
                  some: {
                    blockerId: profile?.id,
                  },
                },
              },
              {
                blockers: {
                  some: {
                    blockingId: profile?.id,
                  },
                },
              },
            ],
          },
        },
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

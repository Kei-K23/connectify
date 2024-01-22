import { db } from "@/lib/db";
import { getCurrentUser } from "./user-service";

export async function getAllPosts() {
  try {
    const profile = await getCurrentUser();
    return await db.post.findMany({
      where: {
        mutes: {
          every: {
            NOT: {
              profileId: profile?.id,
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        profile: {
          include: {
            followers: true,
            followings: true,
          },
        },
        replies: true,
        likes: true,
      },
    });
  } catch (e: any) {
    throw new Error("Internal server error!");
  }
}

export async function getPostById(id: string) {
  try {
    const profile = await getCurrentUser();

    return await db.post.findUnique({
      where: {
        id,
        mutes: {
          every: {
            NOT: {
              profileId: profile?.id,
            },
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
        replies: true,
        likes: true,
      },
    });
  } catch (e: any) {
    throw new Error("Internal server error!");
  }
}

import { db } from "@/lib/db";
import { getCurrentUser } from "./user-service";

export async function getAllPosts() {
  const profile = await getCurrentUser();
  try {
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
    return await db.post.findUnique({
      where: {
        id,
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

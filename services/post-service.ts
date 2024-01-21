import { db } from "@/lib/db";

export async function getAllPosts() {
  try {
    return await db.post.findMany({
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

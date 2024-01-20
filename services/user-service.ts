import { db } from "@/lib/db";
import { currentUser, useUser } from "@clerk/nextjs";

export async function getCurrentUser() {
  const user = await currentUser();

  if (!user || !user.username) {
    return;
  }

  try {
    const profile = await db.profile.findUnique({
      where: {
        externalUserId: user?.id,
        username: user.username,
      },
      include: {
        posts: true,
        followers: true,
        followings: true,
        likes: true,
        blockers: true,
        blockings: true,
        comments: true,
        mutes: true,
      },
    });
    return profile;
  } catch (e: any) {
    throw new Error("User is not register!");
  }
}

export async function useCurrentUser() {
  const { user } = useUser();

  if (!user || !user.username) {
    throw new Error("User is not login!");
  }

  try {
    const profile = await db.profile.findUnique({
      where: {
        externalUserId: user?.id,
        username: user.username,
      },
      include: {
        posts: true,
      },
    });
    return profile;
  } catch (e: any) {
    throw new Error("User is not register!");
  }
}

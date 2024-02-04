import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";

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
        replies: true,
        mutes: true,
      },
    });
    return profile;
  } catch (e: any) {
    throw new Error("User is not register!");
  }
}

export async function authProfile() {
  const { user } = auth();

  if (!user) {
    return null;
  }

  console.log(user, "current");

  const profile = await db.profile.findUnique({
    where: {
      externalUserId: user?.id,
      username: user?.username!,
    },
  });

  if (!profile) {
    return null;
  }
  return profile;
}

export async function getCurrentUserByUsername(username: string) {
  try {
    const profile = await db.profile.findUnique({
      where: {
        username,
      },
      include: {
        posts: true,
        followers: true,
        followings: true,
        likes: true,
        blockers: true,
        blockings: true,
        replies: true,
        mutes: true,
      },
    });
    return profile;
  } catch (e: any) {
    throw new Error("User is not register!");
  }
}

export async function getCurrentUserByExternalUserID(id: string) {
  try {
    const profile = await db.profile.findUnique({
      where: {
        externalUserId: id,
      },
      include: {
        posts: true,
        followers: true,
        followings: true,
        likes: true,
        blockers: true,
        blockings: true,
        replies: true,
        mutes: true,
      },
    });
    return profile;
  } catch (e: any) {
    throw new Error("User is not register!");
  }
}

export async function getProfiles() {
  const user = await currentUser();

  if (!user || !user.username) {
    return;
  }

  try {
    const profile = await db.profile.findMany({
      where: {
        AND: [
          {
            externalUserId: {
              not: user.id,
            },
            username: {
              not: user.username,
            },
          },
          {
            NOT: {
              followings: {
                some: {
                  follower: {
                    externalUserId: user.id,
                    username: user.username,
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        posts: true,
        followers: true,
        followings: true,
        likes: true,
        blockers: true,
        blockings: true,
        replies: true,
        mutes: true,
      },
    });

    return profile;
  } catch (e: any) {
    throw new Error("User is not register!");
  }
}

export async function getFollowers(id: string) {
  try {
    return await db.follow.findMany({
      where: {
        followingId: id,
      },
      include: {
        follower: true,
      },
    });
  } catch (e: any) {
    throw new Error("User is not register!");
  }
}

export async function getBlockings(id: string) {
  try {
    return await db.block.findMany({
      where: {
        blockerId: id,
      },
      include: {
        blocking: true,
      },
    });
  } catch (e: any) {
    throw new Error("User is not register!");
  }
}

export async function getFollowings(id: string) {
  try {
    return await db.follow.findMany({
      where: {
        followerId: id,
      },
      include: {
        following: true,
      },
    });
  } catch (e: any) {
    throw new Error("User is not register!");
  }
}

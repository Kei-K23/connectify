import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

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

export async function getProfiles() {
  const user = await currentUser();

  if (!user || !user.username) {
    return;
  }

  try {
    const profile = await db.profile.findMany({
      // where: {
      //   AND: [
      //     {
      //       NOT: {
      //         OR: [
      //           {
      //             blockings: {
      //               some: {
      //                 blockerId: user?.id,
      //               },
      //             },
      //           },
      //           {
      //             blockers: {
      //               some: {
      //                 blockingId: user?.id,
      //               },
      //             },
      //           },
      //         ],
      //       },
      //     },
      //     {
      //       NOT: {
      //         followers: {
      //           some: {
      //             followerId: user?.id,
      //           },
      //         },
      //       },
      //     },
      //   ],
      // },
      where: {
        AND: [
          {
            NOT: {
              OR: [
                {
                  blockings: {
                    some: {
                      blockerId: user?.id,
                    },
                  },
                },
                {
                  blockers: {
                    some: {
                      blockingId: user?.id,
                    },
                  },
                },
              ],
            },
          },
          {
            NOT: {
              followers: {
                some: {
                  followerId: user?.id,
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

import { db } from "@/lib/db";
import { getCurrentUser } from "./user-service";

export async function getAllPosts() {
  try {
    const profile = await getCurrentUser();
    return await db.post.findMany({
      where: {
        AND: [
          {
            mutes: {
              every: {
                NOT: {
                  profileId: profile?.id,
                },
              },
            },
          },
          {
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
        ],
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
        AND: [
          {
            mutes: {
              every: {
                NOT: {
                  profileId: profile?.id,
                },
              },
            },
          },
          {
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
        ],
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

export async function getPostByProfileId(id: string) {
  try {
    const profile = await getCurrentUser();

    return await db.post.findMany({
      where: {
        profileId: id,
        AND: [
          {
            mutes: {
              every: {
                NOT: {
                  profileId: profile?.id,
                },
              },
            },
          },
          {
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
        ],
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

//! Have to retrieve correctly
export async function getPostByNameAndProfileName(term: string) {
  try {
    const profile = await getCurrentUser();

    return await db.post.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                content: {
                  contains: term,
                },
              },
              {
                profile: {
                  username: {
                    contains: term,
                  },
                },
              },
            ],
          },
          {
            mutes: {
              every: {
                NOT: {
                  profileId: profile?.id,
                },
              },
            },
          },
          {
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
        ],
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

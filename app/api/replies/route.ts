import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user-service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const profile = await getCurrentUser();

    const data = await db.profile.findMany({
      where: {
        id: profile?.id,
      },
      select: {
        replies: {
          where: {
            post: {
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
          },
          include: {
            post: {
              include: {
                profile: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return new NextResponse(JSON.stringify({ data, type: "replies" }));
  } catch (e: any) {
    console.log(e);

    return new NextResponse("Something went wrong!");
  }
}

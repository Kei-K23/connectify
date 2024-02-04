import { db } from "@/lib/db";
import { getCurrentUserByExternalUserID } from "@/services/user-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const profileId = url.searchParams.get("profileId");

    const profile = await getCurrentUserByExternalUserID!(profileId!);

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
    return new NextResponse(JSON.stringify({ error: e }));
  }
}

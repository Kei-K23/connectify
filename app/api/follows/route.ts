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
        followings: {
          where: {
            follower: {
              NOT: {
                AND: [
                  {
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
                      {
                        followings: {
                          some: {
                            followerId: profile?.id,
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
          },
          include: {
            follower: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new NextResponse(JSON.stringify({ data, type: "follows" }));
  } catch (e: any) {
    return new NextResponse("Something went wrong!");
  }
}

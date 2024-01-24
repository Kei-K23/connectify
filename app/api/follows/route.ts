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
        followings: {
          where: {
            follower: {
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
          include: {
            follower: true,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify({ data, type: "follows" }));
  } catch (e: any) {
    return new NextResponse("Something went wrong!");
  }
}

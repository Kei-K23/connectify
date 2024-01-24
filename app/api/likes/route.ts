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
        likes: {
          include: {
            post: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });

    return new NextResponse(JSON.stringify({ data, type: "likes" }));
  } catch (e: any) {
    return new NextResponse("Something went wrong!");
  }
}

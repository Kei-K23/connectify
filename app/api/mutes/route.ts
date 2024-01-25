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
        mutes: {
          include: {
            post: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new NextResponse(JSON.stringify({ data, type: "mutes" }));
  } catch (e: any) {
    return new NextResponse("Something went wrong!");
  }
}

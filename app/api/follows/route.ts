import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user-service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const profile = await getCurrentUser();

    const follows = await db.profile.findMany({
      where: {
        id: profile?.id,
      },
      select: {
        followings: {
          include: {
            follwer: true,
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(follows));
  } catch (e: any) {
    return new NextResponse("Something went wrong!");
  }
}

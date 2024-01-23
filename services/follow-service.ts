import { db } from "@/lib/db";
import { getCurrentUser } from "./user-service";

export async function getFollows() {
  try {
    const profile = await getCurrentUser();

    const follows = await db.profile.findMany({
      where: {
        id: profile?.id,
      },
      select: {
        followings: true,
      },
    });

    console.log(follows);
    return follows;
  } catch (e: any) {
    throw new Error("Internal server error!");
  }
}

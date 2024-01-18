import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export async function getCurrentUser() {
  const user = await currentUser();

  if (!user || !user.username) {
    throw new Error("User is not login!");
  }

  try {
    const profile = await db.profile.findUnique({
      where: {
        externalUserId: user?.id,
        username: user.username,
      },
    });
    return profile;
  } catch (e: any) {
    throw new Error("User is not register!");
  }
}

"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user-service";
import { revalidatePath } from "next/cache";

export async function followToggle(followingId: string) {
  try {
    const profile = await getCurrentUser();
    if (!profile) {
      throw new Error("Unauthorized user!");
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followingId,
        followerId: profile.id,
      },
    });

    if (!existingFollow) {
      // follow the user
      await db.follow.create({
        data: {
          followingId,
          followerId: profile.id,
        },
      });
    } else {
      // already follow then delete/unfollow the user
      await db.follow.delete({
        where: {
          followingId,
          followerId: profile.id,
        },
      });
    }

    revalidatePath("/");
  } catch (e: any) {
    throw new Error("Something went wrong");
  }
}

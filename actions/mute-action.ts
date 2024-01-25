"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user-service";
import { revalidatePath } from "next/cache";

export async function muteToggle(postId: string) {
  try {
    const profile = await getCurrentUser();
    if (!profile) {
      throw new Error("Unauthorized user!");
    }

    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error("Could not find the post!");
    }

    const existingMute = await db.mute.findFirst({
      where: {
        postId,
        profileId: profile.id,
      },
    });

    if (!existingMute) {
      // mute the post
      await db.mute.create({
        data: {
          postId,
          profileId: profile.id,
        },
      });
    } else {
      // existing muted post then delete the mute and unmute the post
      await db.mute.delete({
        where: {
          id: existingMute.id,
        },
      });
    }

    revalidatePath("/");
    revalidatePath(`/profile/${profile.username}/posts/${post.id}`);
  } catch (e: any) {
    console.log(e);

    throw new Error("Something went wrong");
  }
}

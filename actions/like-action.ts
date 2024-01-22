"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user-service";
import { revalidatePath } from "next/cache";

export async function likeToggle(postId: string) {
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

    const existingLike = await db.like.findFirst({
      where: {
        postId,
        profileId: profile.id,
      },
    });

    if (!existingLike) {
      // like the post
      await db.like.create({
        data: {
          postId,
          profileId: profile.id,
        },
      });
    } else {
      // existing like then delete the like
      await db.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    }

    revalidatePath("/");
    revalidatePath(`/${profile.username}/posts/${post.id}`);
  } catch (e: any) {
    throw new Error("Something went wrong");
  }
}

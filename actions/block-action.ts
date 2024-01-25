"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user-service";
import { revalidatePath } from "next/cache";

export async function blockToggle({
  blockingId,
  postId,
}: {
  blockingId: string;
  postId?: string;
}) {
  try {
    let post;
    const profile = await getCurrentUser();
    if (!profile) {
      throw new Error("Unauthorized user!");
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followingId: blockingId,
        followerId: profile.id,
      },
    });

    if (!existingFollow) {
      throw new Error("Could not block! You are not following to this user.");
    }

    const existingBlock = await db.block.findFirst({
      where: {
        blockingId,
        blockerId: profile.id,
      },
    });

    if (postId) {
      post = await db.post.findUnique({
        where: { id: postId },
      });

      if (!post) {
        throw new Error("Could not find the post!");
      }
    }

    if (!existingBlock) {
      // block the user
      await db.block.create({
        data: {
          blockingId,
          blockerId: profile.id,
        },
      });

      revalidatePath("/");
      if (post) {
        revalidatePath(`/profile/${profile.username}/posts/${post.id}`);
      }
      revalidatePath("/activity");
      return { status: "Block" };
    } else {
      // already block then delete/unblock the user
      await db.block.delete({
        where: {
          blockingId,
          blockerId: profile.id,
        },
      });

      revalidatePath("/");
      if (post) {
        revalidatePath(`/profile/${profile.username}/posts/${post.id}`);
      }
      revalidatePath("/activity");
      return { status: "Unblock" };
    }
  } catch (e: any) {
    throw new Error("Something went wrong");
  }
}

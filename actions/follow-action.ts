"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user-service";
import { revalidatePath } from "next/cache";

export async function followToggle({
  followingId,
  postId,
}: {
  followingId: string;
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
        followingId,
        followerId: profile.id,
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

    const existingBlock = await db.block.findFirst({
      where: {
        blockingId: followingId,
        blockerId: profile.id,
      },
    });

    if (existingBlock) {
      throw new Error("Could not follow! User has been blocked.");
    }

    if (!existingFollow) {
      // follow the user
      await db.follow.create({
        data: {
          followingId,
          followerId: profile.id,
        },
      });

      revalidatePath("/");
      if (post) {
        revalidatePath(`/profile/${profile.username}/posts/${post.id}`);
      }
      revalidatePath("/activity");
      revalidatePath("/search");
      return { status: "Follow" };
    } else {
      // already follow then delete/unfollow the user
      await db.follow.delete({
        where: {
          followingId,
          followerId: profile.id,
        },
      });

      revalidatePath("/");
      if (post) {
        revalidatePath(`/profile/${profile.username}/posts/${post.id}`);
      }
      revalidatePath("/activity");
      revalidatePath("/search");
      return { status: "Unfollow" };
    }
  } catch (e: any) {
    throw new Error("Something went wrong");
  }
}

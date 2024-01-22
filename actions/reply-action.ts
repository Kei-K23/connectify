"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user-service";
import { revalidatePath } from "next/cache";

export async function createReply({
  postId,
  content,
  imageUrl,
}: {
  postId: string;
  content: string;
  imageUrl?: string | null;
}) {
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

    const reply = await db.reply.create({
      data: {
        content,
        imageUrl,
        postId,
        profileId: profile.id,
      },
    });

    revalidatePath("/");
    revalidatePath(`/${profile.username}/posts/${post.id}`);

    return reply;
  } catch (e: any) {
    throw new Error("Something went wrong");
  }
}

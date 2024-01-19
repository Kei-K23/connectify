"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user-service";
import { revalidatePath } from "next/cache";

export async function createPost({
  content,
  imageUrl,
}: {
  content: string;
  imageUrl?: string | null;
}) {
  try {
    const profile = await getCurrentUser();
    if (!profile) {
      throw new Error("Unauthorized user!");
    }

    const post = await db.post.create({
      data: {
        content,
        profileId: profile.id,
        imageUrl,
      },
    });

    revalidatePath("/");

    return post;
  } catch (e: any) {
    console.log(e);

    throw new Error("Something went wrong");
  }
}

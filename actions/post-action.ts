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
    throw new Error("Something went wrong");
  }
}

export async function editPost({
  id,
  content,
  imageUrl,
}: {
  id: string;
  content: string;
  imageUrl?: string | null;
}) {
  try {
    const profile = await getCurrentUser();
    if (!profile) {
      throw new Error("Unauthorized user!");
    }

    const validData = {
      content,
      imageUrl,
    };

    const post = await db.post.update({
      where: {
        id,
        profileId: profile.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath("/");

    return post;
  } catch (e: any) {
    throw new Error("Something went wrong");
  }
}

export async function deletePost({ id }: { id: string }) {
  try {
    const profile = await getCurrentUser();
    if (!profile) {
      throw new Error("Unauthorized user!");
    }

    const post = await db.post.delete({
      where: {
        id,
        profileId: profile.id,
      },
    });

    revalidatePath("/");

    return post;
  } catch (e: any) {
    throw new Error("Something went wrong");
  }
}

"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user-service";
import { revalidatePath } from "next/cache";

export async function editProfile({
  bio,
  link,
}: {
  bio?: string;
  link?: string;
}) {
  try {
    const profile = await getCurrentUser();
    if (!profile) {
      throw new Error("Unauthorized user!");
    }

    const editedProfile = await db.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        bio,
        link,
      },
    });

    revalidatePath("/");
    revalidatePath(`/profile/${profile.username}`);

    return editedProfile;
  } catch (e: any) {
    throw new Error("Something went wrong");
  }
}

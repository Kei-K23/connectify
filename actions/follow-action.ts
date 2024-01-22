"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/services/user-service";
import { revalidatePath } from "next/cache";

export async function followToggle({
  followingId,
  postId,
}: {
  followingId: string;
  postId: string;
}) {
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

    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error("Could not find the post!");
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
      revalidatePath(`/${profile.username}/posts/${post.id}`);
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
      revalidatePath(`/${profile.username}/posts/${post.id}`);
      return { status: "Unfollow" };
    }
  } catch (e: any) {
    throw new Error("Something went wrong");
  }
}

// {
//         profile: {
//           OR: [
//             {
//               blockers: {
//                 some: {
//                   blockerId: profile?.id,
//                 },
//               },
//             },
//             {
//               blockings: {
//                 some: {
//                   blockingId: profile?.id,
//                 },
//               },
//             },
//           ],
//         },
//       },

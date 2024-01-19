import { Post, Profile } from "@prisma/client";

export type PostWithProfile = Post & { profile: Profile };
export type ProfileWithPosts = Profile & { posts: Post[] };

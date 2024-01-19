import { Comment, Follow, Like, Post, Profile } from "@prisma/client";

export type PostWithProfile = Post & { profile: Profile };
export type PostWithAll = Post & {
  profile: Profile & {
    followers: Follow[];
    followings: Follow[];
  };
  likes: Like[];
  comments: Comment[];
};
export type ProfileWithPosts = Profile & { posts: Post[] };
export type ProfileWithFollowersAndFollowingsWithPosts = Profile & {
  posts: Post[];
  followers: Follow[];
  followings: Follow[];
};

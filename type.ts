import {
  Block,
  Comment,
  Follow,
  Like,
  Mute,
  Post,
  Profile,
} from "@prisma/client";

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

export type ProfileWithAll = Profile & {
  posts: Post[];
  followers: Follow[];
  followings: Follow[];
  likes: Like[];
  blockers: Block[];
  blockings: Block[];
  comments: Comment[];
  mutes: Mute[];
};

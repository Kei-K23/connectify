import {
  Block,
  Follow,
  Like,
  Mute,
  Post,
  Profile,
  Reply,
} from "@prisma/client";

export type PostWithProfile = Post & { profile: Profile };
export type PostWithAll = Post & {
  profile: Profile & {
    followers: Follow[];
    followings: Follow[];
  };
  likes: Like[];
  replies: Reply[];
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
  replies: Reply[];
  mutes: Mute[];
};

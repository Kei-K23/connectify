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

export type ReplyWithAll = Reply & {
  profile: Profile & {
    followers: Follow[];
    followings: Follow[];
  };
};

export type BlockerWithBlocking = Block & {
  blocking: Profile;
};

export type FollowingWithFollower = Follow & {
  follower: Profile;
};

export type LikeWithProfileAndPost = Like & {
  post: PostWithProfile;
  profile: Profile;
};

export type ReplyWithProfileAndPost = Reply & {
  post: PostWithProfile;
  profile: Profile;
};

export type MuteWithProfileAndPost = Mute & {
  post: PostWithProfile;
  profile: Profile;
};

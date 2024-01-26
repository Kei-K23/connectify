import {
  getBlockings,
  getCurrentUser,
  getCurrentUserByUsername,
  getFollowers,
  getFollowings,
} from "@/services/user-service";
import React from "react";
import ProfileHeader from "./_components/profile-header";
import { getPostByProfileId } from "@/services/post-service";
import PostItem from "@/components/post/post-item";
import { PostWithAll } from "@/type";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const profile = await getCurrentUserByUsername(params.username);
  const currentUser = await getCurrentUser();
  const followers = await getFollowers(currentUser?.id!);
  const followings = await getFollowings(currentUser?.id!);
  const blockings = await getBlockings(currentUser?.id!);

  const isAlreadyFollow = currentUser?.followers.some(
    (f) => f.followingId === profile?.id
  );

  const otherProfile = profile?.username !== currentUser?.username;

  const posts = await getPostByProfileId(profile?.id!);

  return (
    <div>
      <ProfileHeader
        followings={followings}
        followers={followers}
        blockings={blockings}
        profile={profile!}
        otherProfile={otherProfile}
        isAlreadyFollow={isAlreadyFollow!}
        currentUser={currentUser!}
      />

      {posts.length ? (
        <>
          <h2 className="text-center my-6 text-muted-foreground">Posts</h2>
          <div className="space-y-8 mt-4 pb-14">
            {posts.map((post) => (
              <PostItem<PostWithAll>
                key={post.id}
                data={post}
                profile={profile!}
              />
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-center text-muted-foreground mt-4">No posts.</h2>
      )}
    </div>
  );
};

export default ProfilePage;

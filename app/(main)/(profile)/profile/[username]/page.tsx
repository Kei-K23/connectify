import {
  getCurrentUser,
  getCurrentUserByUsername,
} from "@/services/user-service";
import { notFound } from "next/navigation";
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

  const isAlreadyFollow = currentUser?.followers.some(
    (f) => f.followingId === profile?.id
  );

  const otherProfile = profile?.username !== currentUser?.username;

  const posts = await getPostByProfileId(profile?.id!);

  return (
    <div>
      <ProfileHeader
        profile={profile!}
        otherProfile={otherProfile}
        isAlreadyFollow={isAlreadyFollow!}
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

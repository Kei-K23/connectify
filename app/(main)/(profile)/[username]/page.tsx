import { getCurrentUser } from "@/services/user-service";
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
  const profile = await getCurrentUser();

  const otherProfile = profile?.username !== params.username;

  if (otherProfile) {
    return notFound();
  }

  const posts = await getPostByProfileId(profile?.id);

  return (
    <div>
      <ProfileHeader profile={profile} otherProfile={otherProfile} />

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

import React from "react";
import PostEntry from "./_components/post-entry";
import { getAllPosts } from "@/services/post-service";
import { getCurrentUser } from "@/services/user-service";
import PostItem from "@/components/post/post-item";

const HomePage = async () => {
  const profile = await getCurrentUser();
  const posts = await getAllPosts();

  return (
    <div className="mt-[75px] pt-8 mx-auto px-8 md:max-w-[650px] lg:max-w-[700px]">
      <PostEntry profile={profile!} />

      {posts.length ? (
        <div className="space-y-8 mt-4">
          {posts.map((post) => (
            <PostItem key={post.id} data={post} profile={profile!} />
          ))}
        </div>
      ) : (
        <h2 className="text-center text-muted-foreground mt-4">No posts.</h2>
      )}
    </div>
  );
};

export default HomePage;

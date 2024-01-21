import React from "react";
import PostEntry from "./_components/post-entry";
import { getAllPosts } from "@/services/post-service";
import { getCurrentUser } from "@/services/user-service";
import PostItem from "@/components/post/post-item";

const HomePage = async () => {
  const profile = await getCurrentUser();
  const posts = await getAllPosts();

  return (
    <>
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
    </>
  );
};

export default HomePage;

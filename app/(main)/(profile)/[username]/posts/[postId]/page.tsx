import PostItem from "@/components/post/post-item";
import { getPostById } from "@/services/post-service";
import { getAllReplayForPost } from "@/services/reply-service";
import { getCurrentUser } from "@/services/user-service";
import { PostWithAll, ReplyWithAll } from "@/type";
import { notFound } from "next/navigation";
import React from "react";

interface PostIdPageProps {
  params: {
    postId: string;
  };
}

const PostIdPage = async ({ params }: PostIdPageProps) => {
  const profile = await getCurrentUser();
  const post = await getPostById(params.postId);
  const replies = await getAllReplayForPost(params.postId);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PostItem<PostWithAll> data={post} profile={profile!} />
      {/* TODO: Render replay for post */}
      {replies.length && (
        <h2 className="text-center text-muted-foreground mt-4">Reply</h2>
      )}
      {replies.length ? (
        <div className="space-y-8 mt-4">
          {replies.map((reply) => (
            <PostItem<ReplyWithAll>
              key={reply.id}
              data={reply}
              profile={profile!}
            />
          ))}
        </div>
      ) : (
        <h2 className="text-center text-muted-foreground mt-4">No replies.</h2>
      )}
    </>
  );
};

export default PostIdPage;

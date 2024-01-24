"use client";
import React from "react";
import { UserAvatar } from "./user-avatar";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { PostWithProfile } from "@/type";

interface PostActivityItemProps {
  post: PostWithProfile;
}

const PostActivityItem = ({ post }: PostActivityItemProps) => {
  const router = useRouter();
  function onClick() {
    router.push(`/${post.profile.username}/posts/${post.id}`);
  }
  return (
    <>
      <div
        role="button"
        className="w-full flex items-center gap-x-2"
        onClick={onClick}
      >
        <UserAvatar name={post.profile.username} src={post.profile.imageUrl} />
        <div className="flex-1 flex flex-col items-start gap-y-1">
          <h2>{post.profile.username}</h2>
          <p className="truncate">{post.content}</p>
        </div>
      </div>
      <Separator className="w-full last:hidden" />
    </>
  );
};

export default PostActivityItem;

"use client";
import React from "react";
import { UserAvatar } from "./user-avatar";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { PostWithProfile } from "@/type";
import { formatDistanceToNow } from "date-fns";

interface PostActivityItemProps {
  post: PostWithProfile;
  allowRouting?: boolean;
  createdAt: Date;
}

const PostActivityItem = ({
  post,
  allowRouting = true,
  createdAt,
}: PostActivityItemProps) => {
  const router = useRouter();
  function onClick() {
    if (allowRouting) {
      router.push(`/profile/${post.profile.username}/posts/${post.id}`);
    }
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
          <div className="flex items-center gap-x-2">
            <h2>{post.profile.username}</h2>
            <span className="text-muted-foreground">
              {formatDistanceToNow(createdAt)}
            </span>
          </div>
          <p className="truncate w-[230px] overflow-x-auto">{post.content}</p>
        </div>
      </div>
      <Separator className="w-full last:hidden" />
    </>
  );
};

export default PostActivityItem;

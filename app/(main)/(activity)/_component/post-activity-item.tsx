"use client";
import React from "react";
import { UserAvatar } from "./user-avatar";
import { Separator } from "@/components/ui/separator";
import { Post, Profile } from "@prisma/client";
import { useRouter } from "next/navigation";

interface PostActivityItemProps {
  profile: Profile;
  post: Post;
}

const PostActivityItem = ({ profile, post }: PostActivityItemProps) => {
  const router = useRouter();
  function onClick() {
    router.push(`/${profile.username}/posts/${post.id}`);
  }
  return (
    <>
      <div
        role="button"
        className="w-full flex items-center gap-x-2"
        onClick={onClick}
      >
        <UserAvatar name={profile.username} src={profile.imageUrl} />
        <div className="flex-1 flex flex-col items-start gap-y-1">
          <h2>{profile.username}</h2>
          <p className="truncate">{post.content}</p>
        </div>
      </div>
      <Separator className="w-full last:hidden" />
    </>
  );
};

export default PostActivityItem;

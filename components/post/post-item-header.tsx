import { formatDistanceToNow } from "date-fns";
import React from "react";
import { UserAvatar } from "../user-avatar";
import { Button } from "../ui/button";
import { MoreVerticalIcon } from "lucide-react";
import { PostWithProfile, ProfileWithPosts } from "@/type";
import PostItemActions from "./post-item-actions";

interface PostItemHeaderProps {
  data: PostWithProfile;
  profile: ProfileWithPosts;
}

const PostItemHeader = ({ data, profile }: PostItemHeaderProps) => {
  return (
    <div className="flex w-full gap-x-2">
      <UserAvatar name={data.profile.username} src={data.profile.imageUrl} />
      <div className="flex-1 flex flex-col items-start gap-y-1">
        <div className="flex justify-between items-start w-full">
          <div>
            <h2 className="hover:underline transition-all cursor-pointer font-bold">
              {data.profile.username}
            </h2>
          </div>
          <div className="flex items-center gap-x-2">
            <p className="text-muted-foreground">
              {formatDistanceToNow(data.createdAt, { addSuffix: true })}
            </p>
            <PostItemActions data={data} profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItemHeader;

import { formatDistanceToNow } from "date-fns";
import React from "react";
import { UserAvatar } from "../user-avatar";
import { PostWithAll, ProfileWithAll } from "@/type";
import PostItemActions from "./post-item-actions";
import PostUserHoverCard from "./post-user-hover-card";

interface PostItemHeaderProps {
  data: PostWithAll;
  profile: ProfileWithAll;
}

const PostItemHeader = ({ data, profile }: PostItemHeaderProps) => {
  return (
    <div className="flex w-full gap-x-2">
      <UserAvatar
        name={data.profile.username}
        src={data.profile.imageUrl}
        showFollow={profile.username !== data.profile.username}
      />
      <div className="flex-1 flex flex-col items-start gap-y-1">
        <div className="flex justify-between items-start w-full">
          <div>
            <PostUserHoverCard profile={profile} data={data} />
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

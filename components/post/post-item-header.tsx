import { formatDistanceToNow } from "date-fns";
import React from "react";
import { UserAvatar } from "../user-avatar";
import { Button } from "../ui/button";
import { MoreVerticalIcon } from "lucide-react";
import { PostWithProfile } from "@/type";

interface PostItemHeaderProps {
  data: PostWithProfile;
}

const PostItemHeader = ({ data }: PostItemHeaderProps) => {
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
            <Button size={"sm"} variant={"ghost"}>
              <MoreVerticalIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItemHeader;

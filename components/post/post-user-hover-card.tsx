import React from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { UserAvatar } from "../user-avatar";
import { Follow, Profile } from "@prisma/client";
import { Button } from "../ui/button";
import { UserPlusIcon } from "lucide-react";

interface PostUserHoverCardProps {
  profile: Profile & {
    followers: Follow[];
    followings: Follow[];
  };
}

const PostUserHoverCard = ({ profile }: PostUserHoverCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <h2 className="hover:underline transition-all cursor-pointer font-bold">
          {profile.username}
        </h2>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <h3 className="text-base ">{profile.username}</h3>
          </div>
          <UserAvatar name={profile.username} src={profile.imageUrl} />
        </div>

        <div className="space-y-1 mt-4">
          <h3 className="text-base text-muted-foreground">
            {profile.followers.length}{" "}
            {profile.followings.length ? "followings" : "following"}
          </h3>
          <h3 className="text-base text-muted-foreground">
            {profile.followings.length}{" "}
            {profile.followings.length ? "followers" : "follower"}
          </h3>
        </div>
        <Button className="mt-2 w-full flex items-center gap-x-2 font-bold">
          <UserPlusIcon className="w-5 h-5" /> Follow
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
};

export default PostUserHoverCard;

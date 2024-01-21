"use client";
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
import { PostWithAll, ReplyWithAll } from "@/type";

interface PostUserHoverCardProps<T extends PostWithAll | ReplyWithAll> {
  profile: Profile & {
    followers: Follow[];
    followings: Follow[];
  };
  data: T;
}

const PostUserHoverCard = <T extends PostWithAll | ReplyWithAll>({
  profile,
  data,
}: PostUserHoverCardProps<T>) => {
  const otherProfile = data.profile.username !== profile.username;
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <h2 className="hover:underline transition-all cursor-pointer font-bold">
          {data.profile.username}
        </h2>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">
              {data.profile.name} {!otherProfile && "(You)"}
            </h2>
            <h3 className="text-base ">{data.profile.username}</h3>
            <p>
              {data.profile.bio ? data.profile.bio : "No other personal bio!"}
            </p>
          </div>
          <UserAvatar
            name={data.profile.username}
            src={data.profile.imageUrl}
          />
        </div>

        <div className="space-y-1 mt-4">
          <h3 className="text-base text-muted-foreground">
            {data.profile.followers.length}{" "}
            {data.profile.followings.length ? "followings" : "following"}
          </h3>
          <h3 className="text-base text-muted-foreground">
            {data.profile.followings.length}{" "}
            {data.profile.followings.length ? "followers" : "follower"}
          </h3>
        </div>
        {otherProfile && (
          <Button className="mt-2 w-full flex items-center gap-x-2 font-bold">
            <UserPlusIcon className="w-5 h-5" /> Follow
          </Button>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default PostUserHoverCard;

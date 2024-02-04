"use client";

import React, { useState } from "react";
import ActivityNavigation from "../_component/activity-navigation";
import { useQuery } from "@tanstack/react-query";
import {
  BlockerWithBlocking,
  FollowingWithFollower,
  LikeWithProfileAndPost,
  MuteWithProfileAndPost,
  ReplyWithProfileAndPost,
} from "@/type";
import BlockUserItem from "../_component/block-user-item";
import FollowUserItem from "../_component/follow-user-item";
import PostActivityItem from "../_component/post-activity-item";
import { Loader } from "lucide-react";
import PostMuteItem from "../_component/post-mute-item";
import { useUser } from "@clerk/nextjs";

const ActivityPage = () => {
  const [activity, setActivity] = useState<
    "Follows" | "Blocks" | "Mutes" | "Likes" | "Replies"
  >("Follows");
  const { user } = useUser();
  console.log(user);

  const { data, status } = useQuery({
    queryKey: ["activity", activity],
    queryFn: async () => {
      const response = await fetch(
        `/api/${activity.toLowerCase()}?profileId=${user?.id}`
      );

      return response.json();
    },
  });

  return (
    <div>
      <ActivityNavigation setActivity={setActivity} activity={activity} />
      {status === "pending" && (
        <div className="mt-8 w-full flex items-center justify-center">
          <Loader className="w-7 h-7 animate-spin" />
        </div>
      )}
      {data?.type === "follows" && (
        <div className="mt-5 space-y-4">
          {data?.data?.[0]?.followings.length === 0 ? (
            <h2 className="text-muted-foreground text-center">No followers</h2>
          ) : (
            data?.data?.[0]?.followings.map((d: FollowingWithFollower) => (
              <FollowUserItem key={d.id} d={d} activity={activity} />
            ))
          )}
        </div>
      )}

      {data?.type === "blocks" && (
        <div className="mt-5 space-y-4">
          {data?.data?.[0]?.blockers.length === 0 ? (
            <h2 className="text-muted-foreground text-center">No blocks</h2>
          ) : (
            data?.data?.[0]?.blockers.map((d: BlockerWithBlocking) => (
              <BlockUserItem key={d.id} d={d} activity={activity} />
            ))
          )}
        </div>
      )}
      {data?.type === "mutes" && (
        <div className="mt-5 space-y-4">
          {data?.data?.[0]?.mutes.length === 0 ? (
            <h2 className="text-muted-foreground text-center">No mutes</h2>
          ) : (
            data?.data?.[0]?.mutes.map((d: MuteWithProfileAndPost) => (
              <PostMuteItem
                activity={activity}
                key={d.id}
                post={d.post}
                data={d}
                allowRouting={false}
              />
            ))
          )}
        </div>
      )}
      {data?.type === "likes" && (
        <div className="mt-5 space-y-4">
          {data?.data?.[0]?.likes.length === 0 ? (
            <h2 className="text-muted-foreground text-center">No likes</h2>
          ) : (
            data?.data?.[0]?.likes.map((d: LikeWithProfileAndPost) => (
              <PostActivityItem
                key={d.id}
                post={d.post}
                createdAt={d.createdAt}
              />
            ))
          )}
        </div>
      )}
      {data?.type === "replies" && (
        <div className="mt-5 space-y-4">
          {data?.data?.[0]?.replies.length === 0 ? (
            <h2 className="text-muted-foreground text-center">No replies</h2>
          ) : (
            data?.data?.[0]?.replies.map((d: ReplyWithProfileAndPost) => (
              <PostActivityItem
                key={d.id}
                post={d.post}
                createdAt={d.createdAt}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityPage;

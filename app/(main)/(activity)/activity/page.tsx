"use client";

import React, { useState } from "react";
import ActivityNavigation from "../_component/activity-navigation";
import { useQuery } from "@tanstack/react-query";
import { BlockerWithBlocking } from "@/type";
import { UserAvatar } from "../_component/user-avatar";
import { Button } from "@/components/ui/button";
import BlockUserItem from "../_component/block-user-item";

const ActivityPage = () => {
  const [activity, setActivity] = useState<
    "Follows" | "Blocks" | "Mutes" | "Likes" | "Replies"
  >("Follows");

  const { data, status } = useQuery({
    queryKey: ["activity", activity],
    queryFn: async () => {
      const response = await fetch(`/api/${activity.toLowerCase()}`);
      return response.json();
    },
  });

  return (
    <div>
      <ActivityNavigation setActivity={setActivity} activity={activity} />
      {status === "pending" && <h2>Loading...</h2>}
      {data?.type === "follows" &&
        data?.data?.[0]?.followings.map((d: any) => (
          <div key={d?.id}>
            {d.followerId} {d?.follwer?.username}
          </div>
        ))}

      {data?.type === "blocks" && (
        <div className="mt-5 space-y-4">
          {data?.data?.[0]?.blockers.map((d: BlockerWithBlocking) => (
            <BlockUserItem key={d.id} d={d} />
          ))}
        </div>
      )}
      {data?.type === "mutes" &&
        data?.data?.[0]?.mutes.map((d: any) => (
          <div key={d?.id}>
            {d?.post?.content} {d?.profile?.username}
          </div>
        ))}
      {data?.type === "likes" &&
        data?.data?.[0]?.likes.map((d: any) => (
          <div key={d?.id}>
            {d?.post?.content} {d?.profile?.username}
          </div>
        ))}
      {data?.type === "replies" &&
        data?.data?.[0]?.replies.map((d: any) => (
          <div key={d?.id}>
            {d?.post?.content} {d?.profile?.username}
          </div>
        ))}
    </div>
  );
};

export default ActivityPage;

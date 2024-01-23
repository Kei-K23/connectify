"use client";

import React, { useState } from "react";
import ActivityNavigation from "../_component/activity-navigation";
import { useQuery } from "@tanstack/react-query";
import { getFollows } from "@/services/follow-service";

const ActivityPage = () => {
  const [activity, setActivity] = useState<
    "Follows" | "Blocks" | "Mutes" | "Likes"
  >("Follows");

  const { data, status } = useQuery({
    queryKey: ["activity", activity],
    queryFn: async () => {
      const response = await fetch("/api/follows");
      return response.json();
    },
  });
  console.log(data?.[0]?.followings);

  return (
    <div>
      <ActivityNavigation setActivity={setActivity} activity={activity} />
      {status === "pending" && <h2>Loading...</h2>}
      {data?.[0]?.followings.map((d) => (
        <div key={d.id}>
          {d.followerId} {d?.follwer?.username}
        </div>
      ))}
    </div>
  );
};

export default ActivityPage;

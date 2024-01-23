import { Button } from "@/components/ui/button";
import React from "react";

interface ActivityNavigationProps {
  setActivity: (activity: "Follows" | "Blocks" | "Mutes" | "Likes") => void;
  activity: string;
}

const ActivityNavigation = ({
  setActivity,
  activity,
}: ActivityNavigationProps) => {
  const activities = [
    {
      label: "Follows",
      callback: () => {
        setActivity("Follows");
      },
    },
    {
      label: "Blocks",
      callback: () => {
        setActivity("Blocks");
      },
    },
    {
      label: "Mutes",
      callback: () => {
        setActivity("Mutes");
      },
    },
    {
      label: "Likes",
      callback: () => {
        setActivity("Likes");
      },
    },
  ];

  return (
    <div className="w-full flex items-center justify-center gap-x-3">
      {activities.map((a) => (
        <Button
          key={a.label}
          size={"sm"}
          variant={activity === a.label ? "default" : "outline"}
          onClick={a.callback}
        >
          {a.label}
        </Button>
      ))}
    </div>
  );
};

export default ActivityNavigation;

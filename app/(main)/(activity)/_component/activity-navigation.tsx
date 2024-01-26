import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";

interface ActivityNavigationProps {
  setActivity: (
    activity: "Follows" | "Blocks" | "Mutes" | "Likes" | "Replies"
  ) => void;
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
    {
      label: "Replies",
      callback: () => {
        setActivity("Replies");
      },
    },
  ];

  return (
    <div className="relative flex items-center justify-center w-full mx-auto ">
      <ScrollArea className="w-full whitespace-nowrap flex items-center gap-x-3 mx-auto">
        {activities.map((a) => (
          <Button
            key={a.label}
            size={"sm"}
            variant={activity === a.label ? "default" : "outline"}
            onClick={a.callback}
            className="mx-1"
          >
            {a.label}
          </Button>
        ))}
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  );
};

export default ActivityNavigation;

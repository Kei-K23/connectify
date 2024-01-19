"use client";
import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user-avatar";
import { useModalStore } from "@/store/modal-store";
import { Profile } from "@prisma/client";
import React from "react";

interface PostEntryProps {
  profile: Profile;
}

const PostEntry = ({ profile }: PostEntryProps) => {
  const { onOpen } = useModalStore();

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-4">
          <UserAvatar name={profile?.username} src={profile?.imageUrl} />
          <h2 className="text-muted-foreground">Start a post...</h2>
        </div>
        <ActionTooltip title="Create Post">
          <Button
            onClick={() => onOpen({ type: "createPost", data: { profile } })}
            className="rounded-[32px] text-[15px]"
          >
            Post
          </Button>
        </ActionTooltip>
      </div>
      <Separator className="mt-4" />
    </>
  );
};

export default PostEntry;

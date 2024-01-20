"use client";

import React, { useTransition } from "react";
import { HeartIcon, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { PostWithAll, ProfileWithAll } from "@/type";
import { cn } from "@/lib/utils";
import { likeToggle } from "@/actions/like-action";
import { toast } from "sonner";
import { useModalStore } from "@/store/modal-store";

interface PostItemBodyActionsProps {
  profile: ProfileWithAll;
  data: PostWithAll;
}

const PostItemBodyActions = ({ profile, data }: PostItemBodyActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const { onOpen } = useModalStore();
  const postActions = [
    {
      icon: HeartIcon,
      label: "Like",
      callback: () => {
        startTransition(() => {
          likeToggle(data.id).catch(() => toast.error("Something went wrong!"));
        });
      },
    },
    {
      icon: MessageCircle,
      label: "Comment",
      callback: () => {
        console.log("click");

        onOpen({
          type: "commandPost",
          data: {
            post: data,
            profile: profile,
          },
        });
      },
    },
  ];

  const isLiked = profile.likes.some((d) => d.postId === data.id);

  return (
    <div className="flex items-center gap-x-2 mt-3">
      {postActions.map((a) => {
        const Icon = a.icon;

        // only for like button
        if (a.label === "Like") {
          return (
            <Button
              disabled={isPending}
              key={a.label}
              variant={"ghost"}
              size={"xs"}
              onClick={a.callback}
            >
              <Icon
                className={cn(
                  "w-6 h-6 ",
                  isLiked && "stroke-rose-500 fill-rose-500"
                )}
              />
            </Button>
          );
        } else {
          // other action buttons
          return (
            <Button
              key={a.label}
              variant={"ghost"}
              size={"xs"}
              onClick={a.callback}
            >
              <Icon className={cn("w-6 h-6 ")} />
            </Button>
          );
        }
      })}
    </div>
  );
};

export default PostItemBodyActions;

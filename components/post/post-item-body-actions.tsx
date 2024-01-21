"use client";

import React, { MouseEvent, useTransition } from "react";
import { HeartIcon, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { PostWithAll, ProfileWithAll, ReplyWithAll } from "@/type";
import { cn } from "@/lib/utils";
import { likeToggle } from "@/actions/like-action";
import { toast } from "sonner";
import { useModalStore } from "@/store/modal-store";

interface PostItemBodyActionsProps<T extends PostWithAll | ReplyWithAll> {
  profile: ProfileWithAll;
  data: T;
}

const PostItemBodyActions = <T extends PostWithAll | ReplyWithAll>({
  profile,
  data,
}: PostItemBodyActionsProps<T>) => {
  const [isPending, startTransition] = useTransition();
  const { onOpen } = useModalStore();
  const postActions = [
    {
      icon: HeartIcon,
      label: "Like",
      callback: (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        startTransition(() => {
          likeToggle(data.id).catch(() => toast.error("Something went wrong!"));
        });
      },
    },
    {
      icon: MessageCircle,
      label: "Reply",
      callback: (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        // TODO: need to improve type
        onOpen({
          type: "replyPost",
          data: {
            post: data as PostWithAll,
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

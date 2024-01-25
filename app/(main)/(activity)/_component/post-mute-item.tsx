"use client";
import React, { useTransition } from "react";
import { UserAvatar } from "./user-avatar";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { MuteWithProfileAndPost, PostWithProfile } from "@/type";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { muteToggle } from "@/actions/mute-action";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface PostMuteItemProps {
  post: PostWithProfile;
  allowRouting?: boolean;
  activity: string;
  data: MuteWithProfileAndPost;
}

const PostMuteItem = ({
  post,
  allowRouting = true,
  activity,
  data,
}: PostMuteItemProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  function onClick() {
    if (allowRouting) {
      router.push(`/profile/${post.profile.username}/posts/${post.id}`);
    }
  }

  function onUnBlockClick() {
    startTransition(() => {
      muteToggle(post.id)
        .then(() => {
          toast.success(`Unmute`);
          router.refresh();
          queryClient.invalidateQueries({
            queryKey: ["activity", activity],
          });
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <div
          role="button"
          className=" flex items-center gap-x-2"
          onClick={onClick}
        >
          <UserAvatar
            name={post.profile.username}
            src={post.profile.imageUrl}
          />
          <div className="flex-1 flex flex-col items-start gap-y-1">
            <div className="flex items-center gap-x-2">
              <h2>{post.profile.username}</h2>
              <div className="flex items-center gap-x-2">
                <span className="text-yellow-400">(Muted)</span>
                <span className="text-muted-foreground">
                  {formatDistanceToNow(data.createdAt)}
                </span>
              </div>
            </div>
            <p className="truncate">{post.content}</p>
          </div>
        </div>
        <Button
          disabled={isPending}
          variant={"outline"}
          size={"sm"}
          onClick={onUnBlockClick}
        >
          Unmute
        </Button>
      </div>
      <Separator className="w-full last:hidden" />
    </>
  );
};

export default PostMuteItem;

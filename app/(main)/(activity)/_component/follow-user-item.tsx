"use client";
import React, { useTransition } from "react";
import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import { FollowingWithFollower } from "@/type";
import { Separator } from "@/components/ui/separator";
import { followToggle } from "@/actions/follow-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface FollowUserItemProps {
  d: FollowingWithFollower;
  activity: string;
}

const FollowUserItem = ({ d, activity }: FollowUserItemProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  function onFollowClick() {
    startTransition(() => {
      followToggle({ followingId: d.follower.id })
        .then((data) => {
          toast.success(`${data.status} ${d.follower.username}`);
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
      <div className="flex w-full justify-between items-center px-8 gap-x-2 ">
        <div className="flex items-center gap-x-2">
          <UserAvatar
            name={d?.follower?.username}
            src={d?.follower?.imageUrl}
          />
          <div className="flex-1 flex flex-col items-start gap-y-1">
            <h2>{d?.follower?.username}</h2>
            <h3 className="text-indigo-500">Followed you</h3>
          </div>
        </div>
        <Button
          disabled={isPending}
          variant={"outline"}
          size={"sm"}
          onClick={onFollowClick}
        >
          Follow back
        </Button>
      </div>
      <Separator className="w-full last:hidden" />
    </>
  );
};

export default FollowUserItem;

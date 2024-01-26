"use client";
import React, { MouseEvent, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { FollowingWithFollower } from "@/type";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/app/(main)/(activity)/_component/user-avatar";
import { useModalStore } from "@/store/modal-store";
import { followToggle } from "@/actions/follow-action";
import { toast } from "sonner";
import { blockToggle } from "@/actions/block-action";

interface FollowingUserItemProps {
  d: FollowingWithFollower;
  isAlreadyFollow?: boolean;
  isAlreadyBlock?: boolean;
}

const FollowingUserItem = ({
  d,
  isAlreadyFollow,
  isAlreadyBlock,
}: FollowingUserItemProps) => {
  const { onClose } = useModalStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onFollowClick(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();

    startTransition(() => {
      followToggle({ followingId: d.follower.id })
        .then((data) => {
          toast.success(`${data.status} ${d.follower.username}`);
          router.refresh();
          onClose();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  function onBlockClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    startTransition(() => {
      blockToggle({ blockingId: d.follower.id })
        .then((res) => {
          toast.success(`${res.status} ${d.follower.username}`);
          router.refresh();
          onClose();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <>
      <div
        className="border cursor-pointer flex w-full justify-between items-center px-8 gap-x-2 h-16"
        onClick={() => {
          router.push(`/profile/${d.follower.username}`);
          onClose();
        }}
      >
        <div className="flex items-center gap-x-2">
          <UserAvatar
            name={d?.follower?.username}
            src={d?.follower?.imageUrl}
          />
          <div className="flex-1 flex flex-col items-start gap-y-1">
            <h2>{d?.follower?.username}</h2>
          </div>
        </div>
        {!isAlreadyFollow ? (
          <Button
            disabled={isPending}
            variant={"outline"}
            size={"sm"}
            onClick={onFollowClick}
          >
            Follow back
          </Button>
        ) : (
          <div className="flex items-center gap-x-2">
            <Button
              disabled={isPending}
              variant={"outline"}
              size={"sm"}
              className="text-rose-500 hover:text-rose-600"
              onClick={onBlockClick}
            >
              {isAlreadyBlock ? "Unblock" : "Block"}
            </Button>
            <Button
              disabled={isPending}
              variant={"outline"}
              size={"sm"}
              className="text-rose-500 hover:text-rose-600"
              onClick={onFollowClick}
            >
              Unfollow
            </Button>
          </div>
        )}
      </div>
      <Separator className="w-full last:hidden" />
    </>
  );
};

export default FollowingUserItem;

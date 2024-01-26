"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { FollowerWithFollowing } from "@/type";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/app/(main)/(activity)/_component/user-avatar";
import { useModalStore } from "@/store/modal-store";

interface FollowUserItemProps {
  d: FollowerWithFollowing;
}

const FollowerUserItem = ({ d }: FollowUserItemProps) => {
  const { onClose } = useModalStore();
  const router = useRouter();

  return (
    <>
      <div
        className="cursor-pointer border flex w-full justify-between items-center px-8 gap-x-2 h-16"
        onClick={() => {
          router.push(`/profile/${d.following.username}`);
          onClose();
        }}
      >
        <UserAvatar
          name={d?.following?.username}
          src={d?.following?.imageUrl}
        />
        <div className="flex-1 flex flex-col items-start gap-y-1">
          <h2>{d?.following?.username}</h2>
        </div>
      </div>
      <Separator className="w-full last:hidden" />
    </>
  );
};

export default FollowerUserItem;

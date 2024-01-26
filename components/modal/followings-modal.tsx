"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/modal-store";
import { FollowingWithFollower } from "@/type";
import { ScrollArea } from "../ui/scroll-area";
import FollowingUserItem from "@/app/(main)/(profile)/profile/[username]/_components/following-usre.item";

const FollowingsModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();

  const followers = data?.followers;
  const followings = data?.followings;
  const currentProfile = data?.profile;
  const blockers = data?.blockings;

  const isModalOpen = isOpen && type === "followingsModal";

  if (!isModalOpen || !followers || !currentProfile || !blockers) {
    return null;
  }

  function isAlreadyFollow(currentProfileId: string) {
    return followings?.some((f) => f.followerId === currentProfileId);
  }

  function isAlreadyBlock(currentProfileId: string) {
    return blockers?.some((f) => f.blockerId === currentProfileId);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Followers</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-5 space-y-4 max-h-[400px] ">
          {followers.length === 0 ? (
            <h2 className="text-muted-foreground text-center">No followers</h2>
          ) : (
            followers.map((d: FollowingWithFollower) => (
              <FollowingUserItem
                key={d.id}
                d={d}
                isAlreadyBlock={isAlreadyBlock(d.followingId)}
                isAlreadyFollow={isAlreadyFollow(d.followingId)}
              />
            ))
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default FollowingsModal;

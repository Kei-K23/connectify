"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/modal-store";
import { FollowerWithFollowing } from "@/type";
import { ScrollArea } from "../ui/scroll-area";
import FollowerUserItem from "@/app/(main)/(profile)/profile/[username]/_components/follower-usre.item";

const FollowersModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();

  const followers = data?.followings;

  const isModalOpen = isOpen && type === "followersModal";

  if (!isModalOpen || !followers) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Followings</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-5 space-y-4 max-h-[400px] ">
          {followers.length === 0 ? (
            <h2 className="text-muted-foreground text-center">No followings</h2>
          ) : (
            followers.map((d: FollowerWithFollowing) => (
              <FollowerUserItem key={d.id} d={d} />
            ))
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default FollowersModal;

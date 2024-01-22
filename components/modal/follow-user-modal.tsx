"use client";
import React, { useTransition } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModalStore } from "@/store/modal-store";
import { toast } from "sonner";
import { followToggle } from "@/actions/follow-action";
import { UserAvatar } from "../user-avatar";
import { Button } from "../ui/button";
import { UserPlusIcon, UserX2Icon } from "lucide-react";
import { blockToggle } from "@/actions/block-action";

const FollowUserModal = () => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, onClose, data } = useModalStore();

  const profile = data?.profile;
  const post = data?.data;

  const isModalOpen = isOpen && type === "followUser";

  if (!isModalOpen || !post || !post?.profile || !post?.id || !profile) {
    return null;
  }

  const isAlreadyFollow = profile?.followers.some(
    (f) => f.followingId === post?.profileId
  );

  const otherProfile = post?.profile.username !== profile?.username;

  function onFollowClick() {
    startTransition(() => {
      followToggle({ followingId: post?.profileId!, postId: post?.id! })
        .then((d) => {
          toast.success(`${d.status} ${post?.profile.username}`);
          onClose();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  function onBlockClick() {
    startTransition(() => {
      blockToggle({ blockingId: post?.profileId!, postId: post?.id! })
        .then((d) => {
          toast.success(`${d.status} ${post?.profile.username}`);
          onClose();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <div className="mt-4 flex justify-between space-x-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">
              {post?.profile.name} {!otherProfile && "(You)"}
            </h2>
            <h3 className="text-base ">{post?.profile.username}</h3>
            <p>
              {post?.profile.bio ? post?.profile.bio : "No other personal bio!"}
            </p>
          </div>
          <UserAvatar
            name={post?.profile.username!}
            src={post?.profile.imageUrl}
          />
        </div>

        <div className="space-y-1 mt-4">
          <h3 className="text-base text-muted-foreground">
            {post?.profile.followers.length}{" "}
            {post?.profile.followers.length ? "followings" : "following"}
          </h3>
          <h3 className="text-base text-muted-foreground">
            {post?.profile.followings.length}{" "}
            {post?.profile.followings.length ? "followers" : "follower"}
          </h3>
        </div>
        {otherProfile && (
          <Button
            disabled={isPending}
            onClick={onFollowClick}
            variant={isAlreadyFollow ? "outline" : "default"}
            className="mt-2 w-full flex items-center gap-x-2 font-bold"
          >
            {isAlreadyFollow ? (
              <>Following</>
            ) : (
              <>
                <UserPlusIcon className="w-5 h-5" /> Follow
              </>
            )}
          </Button>
        )}
        {otherProfile && isAlreadyFollow && (
          <Button
            disabled={isPending}
            variant={"destructive"}
            className="mt-2 w-full flex items-center gap-x-2 font-bold"
            onClick={onBlockClick}
          >
            <UserX2Icon className="w-5 h-5" /> Block
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FollowUserModal;

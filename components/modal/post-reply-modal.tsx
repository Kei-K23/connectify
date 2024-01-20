"use client";
import React, { FormEvent, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/modal-store";
import { UserAvatar } from "../user-avatar";
import { Input } from "../ui/input";
import ImageUploadBtn from "../image-upload-btn";
import { Button } from "../ui/button";
import { toast } from "sonner";
import VerticalSeparator from "../vertical-separator";
import { Loader2 } from "lucide-react";
import PostItemHeader from "../post/post-item-header";
import PostItemBody from "../post/post-item-body";
import { createReply } from "@/actions/reply-action";

const PostReplyModal = () => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, onClose, data } = useModalStore();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const post = data?.post;
  const profile = data?.profile;

  const isModalOpen = isOpen && type === "replyPost";

  if (!isModalOpen || !post || !post?.profile || !post?.id || !profile) {
    return null;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    startTransition(() => {
      createReply({ content, imageUrl: imageUrl || null, postId: post?.id! })
        .then(() => {
          toast.success("Created reply");
          onClose();
          setImageUrl("");
          setContent("");
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Reply</DialogTitle>
        </DialogHeader>
        <div className="relative flex flex-col gap-x-2 items-start">
          <PostItemHeader data={post} profile={profile!} />
          <PostItemBody
            data={post}
            profile={profile}
            showActions={false}
            showStatus={false}
          />
        </div>
        <div className="relative flex flex-col gap-x-2 items-start">
          <div className="flex items-center gap-x-2">
            <UserAvatar name={profile.username} src={profile?.imageUrl} />
            <h2>{profile.username}</h2>
          </div>
          <div className="relative flex flex-col pl-11 w-full mt-2">
            <VerticalSeparator />
            <form className="w-full" onSubmit={onSubmit}>
              <Input
                required
                disabled={isPending}
                placeholder={`Reply to ${post.profile.username}...`}
                className="w-full bg-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <ImageUploadBtn
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setIsImageUploading={setIsImageUploading}
              />
              <DialogFooter className="mt-4">
                <Button
                  disabled={!content || isPending || isImageUploading}
                  type="submit"
                  className="rounded-[32px] text-[15px] flex items-center gap-x-2"
                >
                  {isPending ? (
                    <>
                      <span>Posting...</span>
                      <Loader2 className="w-4 h-5 text-muted-foreground animate-spin" />
                    </>
                  ) : (
                    "Post"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostReplyModal;

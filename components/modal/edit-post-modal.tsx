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
import { editPost } from "@/actions/post-action";
import { toast } from "sonner";
import VerticalSeparator from "../vertical-separator";
import { Loader2 } from "lucide-react";

const EditPostModal = () => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, onClose, data } = useModalStore();
  const post = data?.post;
  const [imageUrl, setImageUrl] = useState<string>(post?.imageUrl!);
  const [content, setContent] = useState<string>(post?.content!);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);

  const isModalOpen = isOpen && type === "editPost";

  if (!isModalOpen || !post || !post?.profile || !post?.id) {
    return null;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    startTransition(() => {
      editPost({ content, imageUrl: imageUrl || null, id: post?.id! })
        .then(() => {
          toast.success("Edited post");
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
          <DialogTitle className="text-center">Edit Post</DialogTitle>
        </DialogHeader>
        <div className="relative flex flex-col gap-x-2 items-start">
          <div className="flex items-center gap-x-2">
            <UserAvatar
              name={post?.profile.username}
              src={post?.profile?.imageUrl}
            />
            <h2>{post?.profile.username}</h2>
          </div>
          <div className="relative flex flex-col pl-11 w-full mt-2">
            <VerticalSeparator />
            <form className="w-full" onSubmit={onSubmit}>
              <Input
                required
                disabled={isPending}
                placeholder="Start a post..."
                className="w-full bg-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0"
                value={content}
                defaultValue={post.content}
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
                      <span>Saving...</span>
                      <Loader2 className="w-4 h-5 text-muted-foreground animate-spin" />
                    </>
                  ) : (
                    "Save"
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

export default EditPostModal;

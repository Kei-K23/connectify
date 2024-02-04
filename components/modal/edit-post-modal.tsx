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
  const post = data?.data;
  const [imageUrl, setImageUrl] = useState<string>(post?.imageUrl! || "");
  const [content, setContent] = useState<string>(post?.content! || "");
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);

  const isModalOpen = isOpen && type === "editPost";

  if (!isModalOpen || !post || !post?.profile || !post?.id) {
    return null;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    startTransition(() => {
      editPost({
        content: content || post?.content!,
        imageUrl: imageUrl || post?.imageUrl || null,
        id: post?.id!,
      })
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
        <div className="relative flex flex-col items-start gap-x-2">
          <div className="flex items-center gap-x-2">
            <UserAvatar
              name={post?.profile.username}
              src={post?.profile?.imageUrl}
            />
            <h2>{post?.profile.username}</h2>
          </div>
          <div className="relative mt-2 flex w-full flex-col pl-11">
            <VerticalSeparator />
            <form className="w-full" onSubmit={onSubmit}>
              <Input
                required
                disabled={isPending}
                placeholder="Start a post..."
                className="w-full bg-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0"
                value={content || post?.content}
                onChange={(e) => setContent(e.target.value)}
              />
              <ImageUploadBtn
                imageUrl={imageUrl || post?.imageUrl!}
                setImageUrl={setImageUrl}
                setIsImageUploading={setIsImageUploading}
              />
              <DialogFooter className="mt-4">
                <Button
                  disabled={isPending || isImageUploading}
                  type="submit"
                  className="flex items-center gap-x-2 rounded-[32px] text-[15px]"
                >
                  {isPending ? (
                    <>
                      <span>Saving...</span>
                      <Loader2 className="text-muted-foreground h-5 w-4 animate-spin" />
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

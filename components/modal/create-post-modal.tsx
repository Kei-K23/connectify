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
import { createPost } from "@/actions/post-action";
import { toast } from "sonner";
import VerticalSeparator from "../vertical-separator";

const CreatePostModal = () => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, onClose, data } = useModalStore();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const profile = data?.profile;

  const isModalOpen = isOpen && type === "createPost";

  if (!isModalOpen || !profile) {
    return null;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    startTransition(() => {
      createPost({ content, imageUrl: imageUrl || null })
        .then(() => {
          toast.success("New post created");
          onClose();
          setImageUrl("");
          setContent("");
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">New Post</DialogTitle>
        </DialogHeader>
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
                placeholder="Start a post..."
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
                  disabled={isPending || isImageUploading}
                  type="submit"
                  className="rounded-[32px] text-[15px]"
                >
                  Post
                </Button>
              </DialogFooter>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;

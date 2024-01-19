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
import { Separator } from "../ui/separator";
import { createPost } from "@/actions/post-action";
import { toast } from "sonner";

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
        <div className="relative flex gap-x-2 items-start">
          <Separator
            orientation="vertical"
            className="absolute bg-zinc-700 left-[3%] w-[3px] h-[70%] mt-[50px]"
          />
          <UserAvatar name={profile.username} src={profile?.imageUrl} />
          <div className="flex-1 flex flex-col items-start gap-y-1">
            <h2>{profile.username}</h2>
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

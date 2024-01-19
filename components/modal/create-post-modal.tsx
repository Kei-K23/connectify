"use client";
import React, { useState } from "react";
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

const CreatePostModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const profile = data?.profile;

  const isModalOpen = isOpen && type === "createPost";

  if (!isModalOpen || !profile) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">New Post</DialogTitle>
        </DialogHeader>
        <div className="flex gap-x-2 items-start border-l-2">
          <UserAvatar name={profile.username} src={profile?.imageUrl} />
          <div className="flex-1 flex flex-col items-start gap-y-1">
            <h2>{profile.username}</h2>
            <form className="w-full">
              <Input
                placeholder="Start a post..."
                className="w-full bg-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <ImageUploadBtn imageUrl={imageUrl} setImageUrl={setImageUrl} />
              <DialogFooter>
                <Button className="rounded-[32px] text-[15px]">Post</Button>
              </DialogFooter>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;

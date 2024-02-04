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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { editProfile } from "@/actions/profile-action";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const EditProfileModal = () => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, onClose, data } = useModalStore();

  const profile = data?.profile;

  const [bio, setBio] = useState<string>(profile?.bio!);
  const [link, setLink] = useState<string>(profile?.link!);

  const isModalOpen = isOpen && type === "editProfile";

  if (!isModalOpen || !profile) {
    return null;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(() => {
      editProfile({ bio, link })
        .then(() => {
          toast.success("Edited profile");
          onClose();
          setBio("");
          setLink("");
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }
  console.log(profile.bio, profile.link);

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="relative flex flex-col gap-x-2 items-start w-full">
          <form onSubmit={onSubmit} className="w-full space-y-4">
            <div className="w-full space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                disabled={isPending}
                placeholder="Explain about you"
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              >
                {profile.bio}
              </Textarea>
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="link">Social link</Label>
              <Input
                disabled={isPending}
                type="text"
                placeholder="e.g https://github.com/Kei-K23"
                id="link"
                value={link}
                defaultValue={profile.link!}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant={"outline"} disabled={isPending} type="submit">
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
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;

"use client";
import React, { useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useModalStore } from "@/store/modal-store";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { muteToggle } from "@/actions/mute-action";

const MutePostModal = () => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, data, onClose } = useModalStore();
  const post = data?.post;
  const isModalOpen = isOpen && type === "mutePost";

  if (!isModalOpen || !post || !post?.profile || !post?.id) {
    return null;
  }

  function onClick() {
    startTransition(() => {
      muteToggle(post?.id!)
        .then(() => {
          toast.success("Muted the post");
          onClose();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-[280px]">
        <DialogHeader>
          <DialogTitle className="text-center">Mute Post?</DialogTitle>
        </DialogHeader>
        <div className="mt-3 flex items-center justify-center gap-x-5">
          <Button disabled={isPending} variant={"ghost"}>
            Cancel
          </Button>
          <Button
            disabled={isPending}
            variant={"destructive"}
            onClick={onClick}
            className="flex items-center gap-x-2"
          >
            {isPending ? (
              <>
                <span>Loading...</span>
                <Loader2 className="w-4 h-5 text-muted-foreground animate-spin" />
              </>
            ) : (
              "Mute"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MutePostModal;

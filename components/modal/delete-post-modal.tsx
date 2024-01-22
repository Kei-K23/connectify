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
import { deletePost } from "@/actions/post-action";
import { Loader2 } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

const DeletePostModal = () => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { isOpen, type, data, onClose } = useModalStore();
  const post = data?.data;
  const isModalOpen = isOpen && type === "deletePost";
  const isInsidePostIdPage =
    `/${params?.username}/posts/${params?.postId}` === pathname;

  if (!isModalOpen || !post || !post?.profile || !post?.id) {
    return null;
  }

  function onClick() {
    startTransition(() => {
      deletePost({ id: post?.id! })
        .then(() => {
          toast.success("Deleted the post");
          isInsidePostIdPage && router.push("/");
          onClose();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-[280px]">
        <DialogHeader>
          <DialogTitle className="text-center">Delete Post?</DialogTitle>
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
                <span>Deleting...</span>
                <Loader2 className="w-4 h-5 text-muted-foreground animate-spin" />
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePostModal;

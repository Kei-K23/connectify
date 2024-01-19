"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useModalStore } from "@/store/modal-store";

const ConfirmModal = () => {
  const { isOpen, type, onClose } = useModalStore();
  const isModalOpen = isOpen && type === "confirmAction";

  if (!isModalOpen) {
    return null;
  }

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Discard Post?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"ghost"}>Cancel</Button>
          <Button
            variant={"destructive"}
            onClick={() => onClose({ confirm: true })}
          >
            Discard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;

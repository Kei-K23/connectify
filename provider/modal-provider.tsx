"use client";
import ConfirmModal from "@/components/modal/confirm-modal";
import CreatePostModal from "@/components/modal/create-post-modal";
import EditPostModal from "@/components/modal/edit-post-modal";
import React, { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreatePostModal />
      <EditPostModal />
    </>
  );
};

export default ModalProvider;

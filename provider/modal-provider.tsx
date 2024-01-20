"use client";
import CreatePostModal from "@/components/modal/create-post-modal";
import DeletePostModal from "@/components/modal/delete-post-modal";
import EditPostModal from "@/components/modal/edit-post-modal";
import PostCommandModal from "@/components/modal/post-command-modal";
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
      <DeletePostModal />
      <PostCommandModal />
    </>
  );
};

export default ModalProvider;

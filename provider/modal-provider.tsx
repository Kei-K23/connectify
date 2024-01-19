"use client";
import CreatePostModal from "@/components/modal/create-post-modal";
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
    </>
  );
};

export default ModalProvider;

"use client";
import CreatePostModal from "@/components/modal/create-post-modal";
import DeletePostModal from "@/components/modal/delete-post-modal";
import EditPostModal from "@/components/modal/edit-post-modal";
import EditProfileModal from "@/components/modal/edit-profile-modal";
import FollowUserModal from "@/components/modal/follow-user-modal";
import FollowersModal from "@/components/modal/followers-modal";
import MutePostModal from "@/components/modal/mute-post-modal";
import PostReplyModal from "@/components/modal/post-reply-modal";
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
      <PostReplyModal />
      <MutePostModal />
      <FollowUserModal />
      <EditProfileModal />
      <FollowersModal />
    </>
  );
};

export default ModalProvider;

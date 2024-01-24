"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
import React from "react";

const UserAction = () => {
  const { isLoaded } = useUser();

  return isLoaded ? (
    <UserButton
      appearance={{
        elements: {
          avatarBox: {
            width: "40px",
            height: "40px",
          },
        },
      }}
      afterSignOutUrl="/"
    />
  ) : (
    <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-black dark:bg-neutral-100 dark:text-black text-white">
      <User className="w-6 h-6" />
    </div>
  );
};

export default UserAction;

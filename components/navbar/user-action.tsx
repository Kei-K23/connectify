"use client";

import { ProfileWithAll } from "@/type";
import { UserButton, useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
import React from "react";
import MobileNavigation from "./mobile-navigation";

interface UserActionProps {
  profile: ProfileWithAll;
}

const UserAction = ({ profile }: UserActionProps) => {
  const { isLoaded } = useUser();

  return isLoaded ? (
    <div className="flex items-center gap-x-4">
      <MobileNavigation profile={profile} />
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
    </div>
  ) : (
    <div className="flex items-center gap-x-4">
      <MobileNavigation profile={profile} />
      <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-black dark:bg-neutral-100 dark:text-black text-white">
        <User className="w-6 h-6" />
      </div>
    </div>
  );
};

export default UserAction;

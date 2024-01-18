import { UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import React from "react";

interface UserActionProps {
  isLoaded: boolean;
}

const UserAction = ({ isLoaded }: UserActionProps) => {
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
    />
  ) : (
    <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-black dark:bg-neutral-100 dark:text-black text-white">
      <User className="w-6 h-6" />
    </div>
  );
};

export default UserAction;

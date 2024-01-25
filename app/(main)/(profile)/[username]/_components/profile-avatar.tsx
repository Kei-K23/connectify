"use client";

import { User } from "lucide-react";
import Image from "next/image";

interface ProfileAvatarProps {
  name: string;
  src?: string | null;
}

export const ProfileAvatar = ({ name, src }: ProfileAvatarProps) => {
  if (!src) {
    return (
      <div className="relative">
        <div className="flex items-center justify-center w-[80px] h-[80px] rounded-full bg-black dark:bg-neutral-100 dark:text-black text-white">
          <User className="w-6 h-6" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative rounded-full w-[80px] h-[80px]">
        <Image fill src={src} alt={name} className="rounded-full" />
      </div>
    );
  }
};

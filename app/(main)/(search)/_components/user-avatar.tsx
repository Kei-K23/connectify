"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { Profile } from "@prisma/client";

interface UserAvatarProps {
  name: string;
  src?: string | null;
  className?: string;
}

export const UserAvatar = ({ name, src, className }: UserAvatarProps) => {
  if (!src) {
    return (
      <div className="relative">
        <div className="flex items-center justify-center w-[35px] h-[35px] rounded-full bg-black dark:bg-neutral-100 dark:text-black text-white">
          <User className="w-6 h-6" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative">
        <Avatar>
          <AvatarImage src={src!} alt={name} className={cn(className)} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </div>
    );
  }
};

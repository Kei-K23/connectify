"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PlusCircle, User } from "lucide-react";
import { Button } from "./ui/button";
import { PostWithAll } from "@/type";

interface UserAvatarProps {
  name: string;
  src?: string | null;
  className?: string;
  showFollow?: boolean;
}

export function UserAvatar({
  name,
  src,
  className,
  showFollow,
}: UserAvatarProps) {
  if (!src) {
    return (
      <div className="relative">
        <div className="flex items-center justify-center w-[35px] h-[35px] rounded-full bg-black dark:bg-neutral-100 dark:text-black text-white">
          <User className="w-6 h-6" />
        </div>
        {showFollow && (
          <Button className="absolute z-10 -bottom-2 right-0" size={"xxs"}>
            <PlusCircle className="w-5 h-5 " />
          </Button>
        )}
      </div>
    );
  } else {
    return (
      <div className="relative">
        <Avatar>
          <AvatarImage src={src!} alt={name} className={cn(className)} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        {showFollow && (
          <Button className="absolute z-10 -bottom-2 right-0" size={"xxs"}>
            <PlusCircle className="w-5 h-5 " />
          </Button>
        )}
      </div>
    );
  }
}

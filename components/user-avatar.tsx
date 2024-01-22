"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PlusCircle, User, UserCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { PostWithAll, ProfileWithAll, ReplyWithAll } from "@/type";
import { useModalStore } from "@/store/modal-store";
import { profile } from "console";

interface UserAvatarProps<T extends PostWithAll | ReplyWithAll> {
  name: string;
  src?: string | null;
  className?: string;
  showFollow?: boolean;
  isAlreadyFollow?: boolean;
  data?: T;
  profile?: ProfileWithAll;
}

export const UserAvatar = <T extends PostWithAll | ReplyWithAll>({
  name,
  src,
  className,
  showFollow,
  isAlreadyFollow,
  profile,
  data,
}: UserAvatarProps<T>) => {
  const { onOpen } = useModalStore();

  function onClick() {
    onOpen({
      type: "followUser",
      data: {
        profile,
        data,
      },
    });
  }

  if (!src) {
    return (
      <div className="relative">
        <div className="flex items-center justify-center w-[35px] h-[35px] rounded-full bg-black dark:bg-neutral-100 dark:text-black text-white">
          <User className="w-6 h-6" />
        </div>
        {showFollow && isAlreadyFollow && (
          <Button
            className="absolute z-10 -bottom-2 right-0"
            size={"xxs"}
            onClick={onClick}
          >
            <UserCircle2 className="w-5 h-5 " />
          </Button>
        )}
        {showFollow && !isAlreadyFollow && (
          <Button
            className="absolute z-10 -bottom-2 right-0"
            size={"xxs"}
            onClick={onClick}
          >
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
        {showFollow && isAlreadyFollow && (
          <Button
            className="absolute z-10 -bottom-2 right-0"
            size={"xxs"}
            onClick={onClick}
          >
            <UserCircle2 className="w-5 h-5 " />
          </Button>
        )}
        {showFollow && !isAlreadyFollow && (
          <Button
            className="absolute z-10 -bottom-2 right-0"
            size={"xxs"}
            onClick={onClick}
          >
            <PlusCircle className="w-5 h-5 " />
          </Button>
        )}
      </div>
    );
  }
};

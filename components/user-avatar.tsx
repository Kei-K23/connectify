import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface UserAvatarProps {
  name: string;
  src?: string | null;
  className?: string;
}

export function UserAvatar({ name, src, className }: UserAvatarProps) {
  if (!src) {
    return (
      <Avatar>
        <AvatarImage src={src!} alt={name} className={cn(className)} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
    );
  } else {
    return (
      <div className="flex items-center justify-center w-[35px] h-[35px] rounded-full bg-black dark:bg-neutral-100 dark:text-black text-white">
        <User className="w-6 h-6" />
      </div>
    );
  }
}

"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ProfileWithAll } from "@/type";
import { Separator } from "@/components/ui/separator";
import { followToggle } from "@/actions/follow-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserAvatar } from "./user-avatar";

interface SearchUserItemProps {
  d: ProfileWithAll;
}

const SearchUserItem = ({ d }: SearchUserItemProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  function onFollowClick() {
    startTransition(() => {
      followToggle({ followingId: d.id })
        .then((data) => {
          toast.success(`${data.status} ${d.username}`);
          router.refresh();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <>
      <div className="flex w-full justify-between items-center px-8 gap-x-2 ">
        <div className="flex items-center gap-x-2">
          <UserAvatar name={d.username} src={d.imageUrl} />
          <div className="flex-1 flex flex-col items-start gap-y-1">
            <h2>{d.username}</h2>
            <h3 className="text-muted-foreground">People you may know</h3>
          </div>
        </div>
        <Button
          disabled={isPending}
          variant={"outline"}
          size={"sm"}
          onClick={onFollowClick}
        >
          Follow back
        </Button>
      </div>
      <Separator className="w-full last:hidden" />
    </>
  );
};

export default SearchUserItem;

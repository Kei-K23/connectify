"use client";
import React, { useTransition } from "react";
import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import { BlockerWithBlocking } from "@/type";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { blockToggle } from "@/actions/block-action";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface BlockUserItemProps {
  d: BlockerWithBlocking;
  activity: string;
}

const BlockUserItem = ({ d, activity }: BlockUserItemProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  function onUnBlockClick() {
    startTransition(() => {
      blockToggle({ blockingId: d.blocking.id })
        .then((data) => {
          toast.success(`${data.status} ${d.blocking.username}`);
          router.refresh();
          queryClient.invalidateQueries({
            queryKey: ["activity", activity],
          });
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <>
      <div className="flex w-full justify-between items-center px-8 gap-x-2 ">
        <div className="flex items-center gap-x-2">
          <UserAvatar
            name={d?.blocking?.username}
            src={d?.blocking?.imageUrl}
          />
          <div className="flex-1 flex flex-col items-start gap-y-1">
            <h2>{d.blocking.username}</h2>
            <h3 className="text-rose-500">Blocked</h3>
          </div>
        </div>
        <Button
          disabled={isPending}
          variant={"outline"}
          size={"sm"}
          onClick={onUnBlockClick}
        >
          Unblock
        </Button>
      </div>
      <Separator className="w-full last:hidden" />
    </>
  );
};

export default BlockUserItem;

import React from "react";
import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import { BlockerWithBlocking } from "@/type";
import { Separator } from "@/components/ui/separator";

interface BlockUserItemProps {
  d: BlockerWithBlocking;
}

const BlockUserItem = ({ d }: BlockUserItemProps) => {
  return (
    <>
      <div
        key={d.id}
        className="flex w-full justify-between items-center px-8 gap-x-2 "
      >
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
        <Button variant={"outline"} size={"sm"}>
          Unblock
        </Button>
      </div>
      <Separator className="w-full last:hidden" />
    </>
  );
};

export default BlockUserItem;

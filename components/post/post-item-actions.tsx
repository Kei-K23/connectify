"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Edit2Icon,
  MessageSquareXIcon,
  MoreVerticalIcon,
  Trash2Icon,
} from "lucide-react";
import { useModalStore } from "@/store/modal-store";
import { PostWithAll, ProfileWithPosts } from "@/type";

interface PostItemActionsProps {
  data: PostWithAll;
  profile: ProfileWithPosts;
}

const PostItemActions = ({ data, profile }: PostItemActionsProps) => {
  const { onOpen } = useModalStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          <MoreVerticalIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {profile.id === data.profileId && (
          <>
            <DropdownMenuItem
              className="cursor-pointer flex gap-x-2 text-base"
              onClick={() =>
                onOpen({
                  type: "editPost",
                  data: {
                    post: data,
                  },
                })
              }
            >
              <Edit2Icon className="w-4 h-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {profile.id === data.profileId && (
          <DropdownMenuItem
            className="cursor-pointer flex gap-x-2 text-base text-rose-500 focus:text-rose-600"
            onClick={() =>
              onOpen({
                type: "deletePost",
                data: {
                  post: data,
                },
              })
            }
          >
            <Trash2Icon className="w-4 h-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        )}
        {profile.id !== data.profileId && (
          <DropdownMenuItem
            className="cursor-pointer flex gap-x-2 text-base"
            onClick={() =>
              onOpen({
                type: "mutePost",
                data: {
                  post: data,
                },
              })
            }
          >
            <MessageSquareXIcon className="w-4 h-4" />
            <span>Mute</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostItemActions;

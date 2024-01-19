"use client";
import { PostWithProfile } from "@/type";
import Image from "next/image";
import React from "react";
import VerticalSeparator from "../vertical-separator";
import { HeartIcon, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";

interface PostItemBodyProps {
  data: PostWithProfile;
}

const PostItemBody = ({ data }: PostItemBodyProps) => {
  const postActions = [
    {
      icon: HeartIcon,
      label: "Like",
      callback: () => {},
    },
    {
      icon: MessageCircle,
      label: "Comment",
      callback: () => {},
    },
  ];
  return (
    <div className="relative flex flex-col pl-12 w-full ">
      <VerticalSeparator />
      <p>{data.content}</p>
      {data.imageUrl && (
        <div className="relative w-full h-[320px] rounded-lg mt-4 border-2 border-zinc-800">
          <Image
            src={data.imageUrl}
            alt="post body image"
            fill
            className="rounded-lg"
          />
        </div>
      )}
      <div className="flex items-center gap-x-2 mt-3">
        {postActions.map((a) => {
          const Icon = a.icon;
          return (
            <Button key={a.label} variant={"ghost"} size={"xs"}>
              <Icon className="w-6 h-6  stroke-rose-500 fill-rose-500" />
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default PostItemBody;

"use client";
import { PostWithAll, ProfileWithAll } from "@/type";
import Image from "next/image";
import React from "react";
import VerticalSeparator from "../vertical-separator";
import PostItemBodyActions from "./post-item-body-actions";
import PostItemBodyStatus from "./post-item-body-status";

interface PostItemBodyProps {
  data: PostWithAll;
  profile: ProfileWithAll;
}

const PostItemBody = ({ data, profile }: PostItemBodyProps) => {
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
      {/* like and comment btn , etc  */}
      <PostItemBodyActions profile={profile} data={data} />
      {/* like and comment indicator */}
      <PostItemBodyStatus data={data} />
    </div>
  );
};

export default PostItemBody;

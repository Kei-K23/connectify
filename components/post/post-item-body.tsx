"use client";
import { PostWithProfile, ProfileWithAll } from "@/type";
import Image from "next/image";
import React from "react";
import VerticalSeparator from "../vertical-separator";
import PostItemBodyActions from "./post-item-body-actions";

interface PostItemBodyProps {
  data: PostWithProfile;
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
      <PostItemBodyActions profile={profile} data={data} />
    </div>
  );
};

export default PostItemBody;

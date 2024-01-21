"use client";
import { PostWithAll, ProfileWithAll, ReplyWithAll } from "@/type";
import Image from "next/image";
import React from "react";
import VerticalSeparator from "../vertical-separator";
import PostItemBodyActions from "./post-item-body-actions";
import PostItemBodyStatus from "./post-item-body-status";
import { useRouter } from "next/navigation";

interface PostItemBodyProps<T extends PostWithAll | ReplyWithAll> {
  data: T;
  profile: ProfileWithAll;
  showActions?: boolean;
  showStatus?: boolean;
}

const PostItemBody = <T extends PostWithAll | ReplyWithAll>({
  data,
  profile,
  showActions = true,
  showStatus = true,
}: PostItemBodyProps<T>) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/${data.profile.username}/posts/${data.id}`)}
      className="w-full cursor-pointer"
    >
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
        {showActions && <PostItemBodyActions profile={profile} data={data} />}

        {/* like and comment indicator */}
        {showStatus && <PostItemBodyStatus data={data} />}
      </div>
    </div>
  );
};

export default PostItemBody;

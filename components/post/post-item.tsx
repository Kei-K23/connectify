import { PostWithAll, ProfileWithAll, ReplyWithAll } from "@/type";
import React from "react";
import { Separator } from "../ui/separator";
import PostItemHeader from "./post-item-header";
import PostItemBody from "./post-item-body";

interface PostItemProps<T extends PostWithAll | ReplyWithAll> {
  data: T;
  profile: ProfileWithAll;
}

const PostItem = <T extends PostWithAll | ReplyWithAll>({
  data,
  profile,
}: PostItemProps<T>) => {
  return (
    <>
      <div className="relative flex flex-col gap-x-2 items-start">
        <PostItemHeader data={data} profile={profile!} />
        {/* TODO hide or make function the reply like and command section */}
        <PostItemBody data={data} profile={profile} />
      </div>
      <Separator className="mt-4" />
    </>
  );
};

export default PostItem;

import { PostWithProfile } from "@/type";
import React from "react";
import { Separator } from "../ui/separator";
import VerticalSeparator from "../vertical-separator";
import PostItemHeader from "./post-item-header";
import PostItemBody from "./post-item-body";

interface PostItemProps {
  data: PostWithProfile;
}

const PostItem = ({ data }: PostItemProps) => {
  return (
    <>
      <div className="relative flex flex-col gap-x-2 items-start">
        <PostItemHeader data={data} />
        <PostItemBody data={data} />
      </div>
      <Separator className="mt-4" />
    </>
  );
};

export default PostItem;

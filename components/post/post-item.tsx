import {
  PostWithAll,
  ProfileWithFollowersAndFollowingsWithPosts,
} from "@/type";
import React from "react";
import { Separator } from "../ui/separator";
import PostItemHeader from "./post-item-header";
import PostItemBody from "./post-item-body";

interface PostItemProps {
  data: PostWithAll;
  profile: ProfileWithFollowersAndFollowingsWithPosts;
}

const PostItem = ({ data, profile }: PostItemProps) => {
  return (
    <>
      <div className="relative flex flex-col gap-x-2 items-start">
        <PostItemHeader data={data} profile={profile!} />
        <PostItemBody data={data} />
      </div>
      <Separator className="mt-4" />
    </>
  );
};

export default PostItem;

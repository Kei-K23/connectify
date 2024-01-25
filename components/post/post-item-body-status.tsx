import { PostWithAll, ReplyWithAll } from "@/type";
import React from "react";

interface PostItemBodyStatusProps<T extends PostWithAll | ReplyWithAll> {
  data: T;
}

const PostItemBodyStatus = <T extends PostWithAll | ReplyWithAll>({
  data,
}: PostItemBodyStatusProps<T>) => {
  let replayLabel, likeLabel;
  const isEdited = new Date(data.updatedAt) > new Date(data.createdAt);

  if ("replies" in data) {
    replayLabel =
      data.replies.length > 1
        ? `${data.replies.length} replies`
        : `${data.replies.length} reply`;
  }

  if ("likes" in data) {
    likeLabel =
      data.likes.length > 1
        ? `${data.likes.length} likes`
        : `${data.likes.length} like`;
  }

  return (
    <div className="mt-3">
      <p className="text-muted-foreground">
        {likeLabel} . {replayLabel} {isEdited && "(edited)"}
      </p>
    </div>
  );
};

export default PostItemBodyStatus;

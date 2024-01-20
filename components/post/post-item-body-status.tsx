import { PostWithAll } from "@/type";
import React from "react";

interface PostItemBodyStatusProps {
  data: PostWithAll;
}

const PostItemBodyStatus = ({ data }: PostItemBodyStatusProps) => {
  const replayLabel =
    data.replies.length > 1
      ? `${data.replies.length} replies`
      : `${data.replies.length} reply`;

  const likeLabel =
    data.likes.length > 1
      ? `${data.likes.length} likes`
      : `${data.likes.length} like`;

  return (
    <div className="mt-3">
      <p className="text-muted-foreground">
        {likeLabel} . {replayLabel}
      </p>
    </div>
  );
};

export default PostItemBodyStatus;

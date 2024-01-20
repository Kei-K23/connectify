import { PostWithAll } from "@/type";
import React from "react";

interface PostItemBodyStatusProps {
  data: PostWithAll;
}

const PostItemBodyStatus = ({ data }: PostItemBodyStatusProps) => {
  const commentLabel =
    data.comments.length > 1
      ? `${data.comments.length} replies`
      : `${data.comments.length} reply`;

  const likeLabel =
    data.likes.length > 1
      ? `${data.likes.length} likes`
      : `${data.likes.length} like`;

  return (
    <div className="mt-3">
      <p className="text-muted-foreground">
        {likeLabel} . {commentLabel}
      </p>
    </div>
  );
};

export default PostItemBodyStatus;

import React from "react";

interface PostIdPageProps {
  params: {
    postId: string;
  };
}

const PostIdPage = ({ params }: PostIdPageProps) => {
  return <div>This is post id - {params.postId}</div>;
};

export default PostIdPage;

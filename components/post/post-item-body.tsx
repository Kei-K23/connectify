import { PostWithProfile } from "@/type";
import Image from "next/image";
import React from "react";
import VerticalSeparator from "../vertical-separator";
import { HeartIcon, MessageCircle } from "lucide-react";

interface PostItemBodyProps {
  data: PostWithProfile;
}

const PostItemBody = ({ data }: PostItemBodyProps) => {
  const postActions = [
    {
      icon: HeartIcon,
      label: "Like",
      callback: () => {},
    },
    {
      icon: MessageCircle,
      label: "Comment",
      callback: () => {},
    },
  ];
  return (
    <div className="relative flex flex-col pl-11 w-full ">
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
      <div></div>
    </div>
  );
};

export default PostItemBody;

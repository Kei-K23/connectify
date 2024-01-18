import { getCurrentUser } from "@/services/user-service";
import React from "react";
import PostEntry from "./_components/post-entry";
import { Separator } from "@/components/ui/separator";

const HomePage = async () => {
  const profile = await getCurrentUser();

  return (
    <div className="mt-[75px] pt-8 mx-auto px-8 md:max-w-[600px]">
      <PostEntry profile={profile!} />
    </div>
  );
};

export default HomePage;

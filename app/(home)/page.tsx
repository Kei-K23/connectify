import { getCurrentUser } from "@/services/user-service";
import React from "react";
import PostEntry from "./_components/post-entry";

const HomePage = async () => {
  const profile = await getCurrentUser();

  return (
    <div className="mt-[75px] mx-auto px-8 md:max-w-[600px]">
      <PostEntry profile={profile!} />
    </div>
  );
};

export default HomePage;

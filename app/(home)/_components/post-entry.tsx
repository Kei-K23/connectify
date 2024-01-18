import { UserAvatar } from "@/components/user-avatar";
import { Profile } from "@prisma/client";
import React from "react";

interface PostEntryProps {
  profile: Profile;
}

const PostEntry = ({ profile }: PostEntryProps) => {
  return (
    <div>
      <div>
        <UserAvatar name={profile.username} src={profile.imageUrl} />
      </div>
    </div>
  );
};

export default PostEntry;

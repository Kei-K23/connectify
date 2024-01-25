"use client";
import React from "react";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileWithAll } from "@/type";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  profile: ProfileWithAll;
  otherProfile: boolean;
}

const ProfileHeader = ({ profile, otherProfile }: ProfileHeaderProps) => {
  const router = useRouter();
  function onClick() {
    if (profile.link) {
      router.push(profile.link);
    }
  }

  return (
    <div>
      <div className="flex justify-between space-x-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">
            {profile.name} {!otherProfile && "(You)"}
          </h2>
          <h3 className="text-base ">{profile.username}</h3>
          <p>{profile.bio ? profile.bio : "No other personal bio!"}</p>
          <p
            className={cn(profile.link && "underline hover:no-underline")}
            role="button"
            onClick={onClick}
          >
            {profile.link ? profile.link : "No other social media link!"}
          </p>
        </div>
        <ProfileAvatar name={profile.username} src={profile.imageUrl} />
      </div>

      <div className="space-y-1 mt-4">
        <h3 className="text-base text-muted-foreground">
          {profile.followers.length}{" "}
          {profile.followers.length ? "followings" : "following"}
        </h3>
        <h3 className="text-base text-muted-foreground">
          {profile.followings.length}{" "}
          {profile.followings.length ? "followers" : "follower"}
        </h3>
      </div>
      <Button className="mt-4 w-full border-2 rounded-xl" variant={"outline"}>
        Edit Profile
      </Button>
    </div>
  );
};

export default ProfileHeader;

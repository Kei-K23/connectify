"use client";
import React, { MouseEvent, useTransition } from "react";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileWithAll } from "@/type";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { followToggle } from "@/actions/follow-action";
import { toast } from "sonner";
import { UserPlusIcon, UserX2Icon } from "lucide-react";
import { blockToggle } from "@/actions/block-action";

interface ProfileHeaderProps {
  profile: ProfileWithAll;
  otherProfile: boolean;
  isAlreadyFollow: boolean;
}

const ProfileHeader = ({
  profile,
  otherProfile,
  isAlreadyFollow,
}: ProfileHeaderProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function onClick() {
    if (profile.link) {
      router.push(profile.link);
    }
  }

  function onFollowClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    startTransition(() => {
      followToggle({ followingId: profile.id })
        .then((d) => {
          toast.success(`${d.status} ${profile.username}`);
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  function onBlockClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    startTransition(() => {
      blockToggle({ blockingId: profile.id })
        .then((d) => {
          toast.success(`${d.status} ${profile.username}`);
        })
        .catch(() => toast.error("Something went wrong"));
    });
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
            className={cn(
              profile.link && "underline hover:no-underline cursor-pointer"
            )}
            onClick={onClick}
          >
            {profile.link ? profile.link : "No other social media link!"}
          </p>
        </div>
        <ProfileAvatar name={profile.username} src={profile.imageUrl} />
      </div>

      <div className="space-y-1 my-4">
        <h3 className="text-base text-muted-foreground">
          {profile.followers.length}{" "}
          {profile.followers.length ? "followings" : "following"}
        </h3>
        <h3 className="text-base text-muted-foreground">
          {profile.followings.length}{" "}
          {profile.followings.length ? "followers" : "follower"}
        </h3>
      </div>
      {otherProfile && (
        <Button
          disabled={isPending}
          onClick={onFollowClick}
          variant={isAlreadyFollow ? "outline" : "default"}
          className="mt-2 w-full flex items-center gap-x-2 font-bold"
        >
          {isAlreadyFollow ? (
            <>Following</>
          ) : (
            <>
              <UserPlusIcon className="w-5 h-5" /> Follow
            </>
          )}
        </Button>
      )}
      {otherProfile && isAlreadyFollow && (
        <Button
          disabled={isPending}
          variant={"destructive"}
          className="mt-2 w-full flex items-center gap-x-2 font-bold"
          onClick={onBlockClick}
        >
          <UserX2Icon className="w-5 h-5" /> Block
        </Button>
      )}
      {!otherProfile && (
        <Button className="w-full border-2 rounded-xl" variant={"outline"}>
          Edit Profile
        </Button>
      )}
      <Separator className="w-full mt-6" />
    </div>
  );
};

export default ProfileHeader;
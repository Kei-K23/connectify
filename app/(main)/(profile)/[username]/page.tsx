import { getCurrentUser } from "@/services/user-service";
import { notFound } from "next/navigation";
import React from "react";
import ProfileHeader from "./_components/profile-header";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const profile = await getCurrentUser();

  const otherProfile = profile?.username !== params.username;

  if (otherProfile) {
    return notFound();
  }

  return (
    <div>
      <ProfileHeader profile={profile} otherProfile={otherProfile} />
    </div>
  );
};

export default ProfilePage;

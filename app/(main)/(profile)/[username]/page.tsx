import React from "react";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

const ProfilePage = ({ params }: ProfilePageProps) => {
  return <div>this is profile page - {params.username}</div>;
};

export default ProfilePage;

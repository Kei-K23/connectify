import { db } from "@/lib/db";
import { ProfileWithPosts } from "@/type";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const useCurrentUser = () => {
  const [profile, setProfile] = useState<ProfileWithPosts>();
  const { user, isSignedIn } = useUser();

  if ((!user || !user.username) && isSignedIn) {
    throw new Error("User is not login!");
  }

  useEffect(() => {
    (async () => {
      const dataProfile = await db.profile.findUnique({
        where: {
          externalUserId: user?.id,
          username: user?.username!,
        },
        include: {
          posts: true,
        },
      });
      setProfile(dataProfile!);
    })();
  }, [user?.id, user?.username]);

  return { profile };
};

export default useCurrentUser;

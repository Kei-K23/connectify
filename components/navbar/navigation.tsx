"use client";
import {
  ArrowBigLeft,
  Heart,
  Home,
  Search,
  SquarePenIcon,
  User,
} from "lucide-react";
import React from "react";
import NavigationItem from "./navigation-item";
import { useParams, usePathname } from "next/navigation";
import { useModalStore } from "@/store/modal-store";
import { ProfileWithAll } from "@/type";

interface NavigationProps {
  profile: ProfileWithAll;
}

const Navigation = ({ profile }: NavigationProps) => {
  const { onOpen } = useModalStore();
  const pathname = usePathname();
  const params = useParams();
  const isInsidePostIdPage =
    `/profile/${params?.username}/posts/${params?.postId}` === pathname ||
    pathname !== `/profile/${profile?.username}`;

  const navigation = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/search",
      label: "Search",
      icon: Search,
    },
    {
      href: "",
      label: "Post",
      icon: SquarePenIcon,
      callback: () => {
        onOpen({
          type: "createPost",
          data: {
            profile,
          },
        });
      },
    },
    {
      href: "/activity",
      label: "Activity",
      icon: Heart,
    },
    {
      href: `/profile/${profile.username}`,
      label: "Profile",
      icon: User,
    },
  ];

  if (isInsidePostIdPage) {
    navigation.unshift({
      href: "/",
      label: "Back to Main page",
      icon: ArrowBigLeft,
    });
  }

  return (
    <div className="flex items-center gap-x-4">
      {navigation.map((n) => (
        <NavigationItem key={n.label} item={n} pathname={pathname} />
      ))}
    </div>
  );
};

export default Navigation;

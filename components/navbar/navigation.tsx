"use client";
import { Heart, Home, Search, SquarePenIcon, User } from "lucide-react";
import React from "react";
import NavigationItem from "./navigation-item";
import { usePathname } from "next/navigation";
import { useModalStore } from "@/store/modal-store";
import { ProfileWithPosts } from "@/type";

interface NavigationProps {
  profile: ProfileWithPosts;
}

const Navigation = ({ profile }: NavigationProps) => {
  const { onOpen } = useModalStore();
  const pathname = usePathname();

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
      href: "/profile",
      label: "Profile",
      icon: User,
    },
  ];
  return (
    <div className="flex items-center gap-x-4">
      {navigation.map((n) => (
        <NavigationItem key={n.label} item={n} pathname={pathname} />
      ))}
    </div>
  );
};

export default Navigation;

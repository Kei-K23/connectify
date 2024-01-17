"use client";
import { Heart, Home, Search, SquarePenIcon, User } from "lucide-react";
import React from "react";
import NavigationItem from "./navigation-item";
import { usePathname } from "next/navigation";

const Navigation = () => {
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
        // TODO :: Open modal to create post
        console.log("hello");
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

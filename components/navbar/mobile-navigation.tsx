"use client";
import React from "react";
import {
  ArrowBigLeft,
  Heart,
  Home,
  Menu,
  Search,
  SquarePenIcon,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileWithAll } from "@/type";
import { useModalStore } from "@/store/modal-store";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface MobileNavigation {
  profile: ProfileWithAll;
}

const MobileNavigation = ({ profile }: MobileNavigation) => {
  const { onOpen } = useModalStore();
  const router = useRouter();
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant={"ghost"} className="md:hidden block ">
          <Menu className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {navigation.map((n) => (
          <DropdownMenuItem
            className="cursor-pointer"
            key={n.label}
            onClick={() => {
              router.push(n.href);
              if (n.callback) {
                n.callback();
              }
            }}
          >
            {n.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNavigation;

"use client";

import React from "react";
import Logo from "./logo";
import Navigation from "./navigation";
import { useUser } from "@clerk/nextjs";
import UserAction from "./user-action";
import { Profile } from "@prisma/client";
import { ProfileWithPosts } from "@/type";

interface NavbarProps {
  profile: ProfileWithPosts;
}

const Navbar = ({ profile }: NavbarProps) => {
  const { isLoaded } = useUser();

  return (
    <header className="fixed top-0 h-[75px] w-full">
      <nav className="bg-black/90 h-full flex items-center justify-between px-8 lg:px-32 xl:px-40 border-b">
        <Logo />
        <Navigation profile={profile} />
        <UserAction isLoaded={isLoaded} />
      </nav>
    </header>
  );
};

export default Navbar;

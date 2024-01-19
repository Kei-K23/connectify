import React from "react";
import Logo from "./logo";
import Navigation from "./navigation";
import UserAction from "./user-action";
import { getCurrentUser } from "@/services/user-service";

const Navbar = async () => {
  const profile = await getCurrentUser();

  return (
    <header className="fixed top-0 h-[75px] w-full">
      <nav className="bg-black/90 h-full flex items-center justify-between px-8 lg:px-32 xl:px-40 border-b">
        <Logo />
        <Navigation profile={profile!} />
        <UserAction />
      </nav>
    </header>
  );
};

export default Navbar;

import React from "react";
import Logo from "./logo";
import Navigation from "./navigation";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <header className="fixed top-0 h-[75px] w-full">
      <nav className="bg-black/90 h-full flex items-center justify-between px-8 lg:px-32 xl:px-40 border-b">
        <Logo />
        <Navigation />
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: "40px",
                height: "40px",
              },
            },
          }}
        />
      </nav>
    </header>
  );
};

export default Navbar;

"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

const Logo = () => {
  const theme = useTheme();

  return (
    <Link
      href={"/"}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "relative w-[40px] h-[40px]"
      )}
    >
      <Image
        fill
        src={
          theme.resolvedTheme === "dark" ? "/logo_light.png" : "/logo_dark.png"
        }
        alt="logo"
      />
    </Link>
  );
};

export default Logo;

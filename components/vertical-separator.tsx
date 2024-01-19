import React from "react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

const VerticalSeparator = () => {
  return (
    <Separator
      orientation="vertical"
      className={cn("absolute bg-zinc-700 left-[2.7%] w-[3px] h-[100%] top-2")}
    />
  );
};

export default VerticalSeparator;

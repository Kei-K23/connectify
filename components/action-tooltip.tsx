"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import React from "react";

interface ActionTooltipProps {
  children: React.ReactNode;
  title: string;
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left";
}

const ActionTooltip = ({
  children,
  title,
  align,
  side,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align} className="lowercase">
          <p className="capitalize">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTooltip;

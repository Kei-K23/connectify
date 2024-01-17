import { LucideIcon } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ActionTooltip from "../action-tooltip";

interface NavigationItemProps {
  item: {
    href: string;
    label: string;
    icon: LucideIcon;
    callback?: (() => void) | null;
  };
  pathname: string;
}

const NavigationItem = ({ item, pathname }: NavigationItemProps) => {
  const isActive = pathname === item.href;
  const Icon = item.icon;

  if (item.callback) {
    return (
      <ActionTooltip title={item.label}>
        <Button variant={"ghost"} onClick={item.callback}>
          <Icon
            className={cn(
              "w-[29px] h-[29px] text-muted-foreground",
              isActive && "text-primary"
            )}
          />
        </Button>
      </ActionTooltip>
    );
  } else {
    return (
      <ActionTooltip title={item.label}>
        <Link
          className={cn(buttonVariants({ variant: "ghost" }))}
          href={item.href}
        >
          <Icon
            className={cn(
              "w-[29px] h-[29px] text-muted-foreground",
              isActive && "text-primary"
            )}
          />
        </Link>
      </ActionTooltip>
    );
  }
};

export default NavigationItem;

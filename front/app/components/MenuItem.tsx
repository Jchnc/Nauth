import { cn } from "@/app/lib/utils";
import { type ReactNode } from "react";
import Tooltip from "./Tooltip";

interface MenuItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  isSidebarHidden?: boolean;
}

export function MenuItem({
  icon,
  label,
  href,
  isSidebarHidden,
}: MenuItemProps) {
  return (
    <Tooltip text={label} direction="right">
      <a
        href={href}
        className={cn(
          "flex items-center gap-4 rounded-lg p-2 transition-all hover:bg-dark-2-hover",
          "text-text-dark-0 hover:text-text-dark-1",
          isSidebarHidden && "justify-center"
        )}
      >
        {icon}
        <span className={cn(isSidebarHidden ? "hidden" : "block")}>
          {label}
        </span>
      </a>
    </Tooltip>
  );
}

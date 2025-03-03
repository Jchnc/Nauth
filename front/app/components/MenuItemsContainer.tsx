import { cn } from "@/app/lib/utils";
import { type ReactNode } from "react";

interface MenuItemsContainerProps {
  children: ReactNode;
}

export function MenuItemsContainer({ children }: MenuItemsContainerProps) {
  return (
    <div className={cn("grid gap-4 p-2 min-h-0")}>{children}</div>
  );
}

import { cn } from "@/app/lib/utils";
import { ChevronsUpDown, User } from "lucide-react";

interface UserProfileHeaderProps {
  label: string;
  isSidebarHidden?: boolean;
  onClick: () => void;
}

export function UserProfileHeader({
  label,
  onClick,
  isSidebarHidden,
}: UserProfileHeaderProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 rounded-lg p-4 transition-all hover:bg-background",
        "text-foreground-muted hover:text-foreground",
        "w-full"
      )}
    >
      <span
        className={cn(
          "block rounded-full",
          "w-6 h-6 flex items-center justify-center",
        )}
      >
        <User size={20} />
      </span>
      <span className={cn(isSidebarHidden ? "hidden" : "block")}>{label}</span>
      <ChevronsUpDown
        className={cn(
          "ml-auto",
          "text-foreground-muted hover:text-foreground",
          "w-4 h-4",
          isSidebarHidden ? "hidden" : "block"
        )}
      />
    </button>
  );
}

export default UserProfileHeader;

import { cn } from "@/app/lib/utils";
import { LogOut, Settings } from "lucide-react";
import React from "react";

interface UserProfileBodyProps {
  isUserBodyOpen: boolean;
}

const UserProfileBody: React.FC<UserProfileBodyProps> = ({
  isUserBodyOpen,
}) => {
  return (
    <div
      className={cn(
        "grid transition-all duration-300 ease-in-out overflow-hidden",
        "px-4 bg-background-lighter shadow-card",
        "border-border",
        isUserBodyOpen ? "border-t grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
    >
      <div className="flex flex-col gap-4 min-h-0">
        <ul className="w-full p-2">
          <li>
            <button
              className={cn(
                "text-foreground-muted flex items-center gap-2 rounded-lg p-2 transition-all hover:bg-background w-full",
                "hover:text-foreground"
              )}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </li>
          <li>
            <button
              className={cn(
                "text-red-500 flex items-center gap-2 rounded-lg p-2 transition-all hover:bg-background w-full",
                "hover:text-foreground"
              )}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfileBody;

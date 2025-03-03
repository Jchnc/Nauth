import React, { useState } from "react";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface UserMenuDropdownProps {
  userName: string;
  onLogOut: () => void;
  onChangeTheme: () => void;
}

const UserMenuDropdown: React.FC<UserMenuDropdownProps> = ({
  userName,
  onLogOut,
  onChangeTheme,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-4 rounded-lg p-2 transition-all hover:bg-dark-2-hover"
      >
        <User className="w-6 h-6" />
        <span className="text-text-dark-0 hover:text-text-dark-1">
          {userName}
        </span>
        <ChevronDown
          className={cn(
            "w-6 h-6 transition-all",
            isDropdownOpen && "rotate-180"
          )}
        />
      </button>
      {isDropdownOpen && (
        <div className="absolute z-50 bg-dark-2 rounded-lg shadow-md">
          <ul className="flex flex-col gap-2 p-2 text-xs">
            <li>
              <button
                onClick={onChangeTheme}
                className="flex items-center gap-4 rounded-lg p-2 transition-all hover:bg-dark-2-hover"
              >
                <Settings className="w-4 h-4" />
                <span className="text-text-dark-0 hover:text-text-dark-1">
                  Change Theme
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={onLogOut}
                className="flex items-center gap-4 rounded-lg p-2 transition-all hover:bg-dark-2-hover"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span className="hover:text-text-dark-1 text-red-500">
                  Log Out
                </span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenuDropdown;

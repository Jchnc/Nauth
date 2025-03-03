"use client";

import { MenuItem } from "@/app/components/MenuItem";
import { MenuItemsContainer } from "@/app/components/MenuItemsContainer";
import UserMenuDropdown from "@/app/components/UserMenuDropdown";
import { cn } from "@/app/lib/utils";
import { LayoutDashboard, Menu, Settings, User } from "lucide-react";
import { useState } from "react";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/40", // Placeholder avatar
  };

  return (
    <div
      className={cn(
        "grid grid-cols-[255px_1fr] min-h-screen bg-dark-0 transition-all",
        !isSidebarOpen && "grid-cols-[60px_1fr]"
      )}
    >
      {/* Sidebar */}
      <aside className="bg-dark-0 border-r border-dark-2">
        <div className="gap-2 grid grid-cols-[40px_1fr] items-center p-2 min-h-16 border-b border-dark-2">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:text-white hover:bg-dark-2-hover p-2 rounded-lg"
          >
            <Menu size={24} color="white" />
          </button>
          <h1
            className={cn(
              "text-xl font-bold text-text-dark-1",
              !isSidebarOpen && "hidden"
            )}
          >
            Nauth
          </h1>
        </div>
        <MenuItemsContainer>
          <MenuItem
            icon={<LayoutDashboard size={20} color="white" />}
            label="Dashboard"
            href="/dashboard"
            isSidebarHidden={!isSidebarOpen}
          />
          <MenuItem
            icon={<User size={20} color="white" />}
            label="Profile"
            href="/profile"
            isSidebarHidden={!isSidebarOpen}
          />
          <MenuItem
            icon={<Settings size={20} color="white" />}
            label="Settings"
            href="/settings"
            isSidebarHidden={!isSidebarOpen}
          />
        </MenuItemsContainer>
      </aside>
      <div>
        {/* Top Bar */}
        <header className="border-b border-dark-2 px-10 min-h-16 max-h-16 flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-dark-1">Dashboard</h2>
          {/* User Avatar */}
          <div className="flex items-center gap-4">
            <UserMenuDropdown
              userName={user.name}
              onLogOut={() => console.log("Log Out")}
              onChangeTheme={() => console.log("Change Theme")}
            />
          </div>
        </header>
        {/* Page Content */}
        <main className="p-4 max-w-6xl">
          <div className="bg-dark-3 border border-dark-2 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-text-dark-1 mb-4">
              Overview
            </h2>
            <p className="text-text-dark-0">
              This is your dashboard. You can manage your profile, settings, and
              more from here.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

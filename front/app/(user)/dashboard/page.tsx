"use client";

import { cn } from "@/app/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";
import UserMenuItem from "@/app/components/UserMenuItem";
import Sidebar from "@/app/components/Sidebar";

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
        "grid grid-cols-[255px_1fr] min-h-screen transition-all",
        !isSidebarOpen && "grid-cols-[60px_1fr]"
      )}
    >
      {/* Sidebar */}
      <aside className="bg-background-lighter border-r border-border">
        <div className="gap-2 grid grid-cols-[40px_1fr] items-center p-2 min-h-16 border-b border-border">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-foreground-muted hover:text-foreground hover:bg-background p-2 rounded-lg"
          >
            <Menu size={24} color="white" />
          </button>
          <h1
            className={cn(
              "text-xl font-bold text-foreground",
              !isSidebarOpen && "hidden"
            )}
          >
            <span className="text-accent-blue">N</span>auth
          </h1>
        </div>
        {/* User Avatar */}
        <UserMenuItem
          label={user.name}
          isSidebarHidden={!isSidebarOpen}
          onClick={() => console.log("Profile")}
        />
        <hr  className="border-border border-t-1 w-full" />
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </aside>
      <div>
        {/* Top Bar */}
        <header className="border-b border-border px-10 min-h-16 max-h-16 flex items-center justify-between bg-background-lighter">
          <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
        </header>
        {/* Page Content */}
        <main className="p-4 max-w-6xl">
          <div className="bg-background-lighter border border-border p-6 rounded-lg shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Overview
            </h2>
            <p className="text-foreground-muted">
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

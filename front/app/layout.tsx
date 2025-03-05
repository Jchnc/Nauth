"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "./lib/utils";
import useSidebarState from "./hooks/useSidebarState";
import HeaderMenu from "./components/HeaderMenu";
import Aside from "./components/Aside";

//#region Layout Configuration
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://i.pravatar.cc/40", // Placeholder avatar
};

//#endregion

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isSidebarOpen, handleSidebarToggle } = useSidebarState();

  return (
    <html lang="en">
      <head>
        <title>Nauth - Auth & User Management</title>
        <meta
          name="description"
          content="Nauth is a quickstart Next.js project for authentication. It includes a dashboard, authentication, and user management system."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Jean Christopher Navarro" />
        <meta
          name="keywords"
          content="Next.js, React, TypeScript, Tailwind, Auth, Nauth"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div
          className={cn(
            "grid grid-cols-[255px_1fr] min-h-screen transition-all",
            !isSidebarOpen && "grid-cols-[60px_1fr]"
          )}
        >
          <Aside
            user={user}
            handleSidebarToggle={handleSidebarToggle}
            isSidebarOpen={isSidebarOpen}
          />
          <div className="flex flex-col">
            <HeaderMenu title="Dashboard" />
            <main className="flex-1 p-4 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

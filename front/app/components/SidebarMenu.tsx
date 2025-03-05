"use client";
import { MenuData } from "@/app/types";
import {
  CreditCard,
  DollarSign,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "../lib/utils";
import Tooltip from "./Tooltip";

const menuData: MenuData = {
  Overview: {
    Dashboard: {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
  },
  Finance: {
    Transactions: {
      label: "Transactions",
      href: "/finance/transactions",
      icon: CreditCard,
    },
    Invoices: {
      label: "Invoices",
      href: "/finance/invoices",
      icon: FileText,
    },
    Payments: {
      label: "Payments",
      href: "/finance/payments",
      icon: DollarSign,
    },
  },
};

const SideBarMenu: React.FC<{ isSidebarOpen: boolean }> = ({
  isSidebarOpen,
}) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "w-full bg-background-lighter",
        isSidebarOpen ? "p-4" : "p-2"
      )}
    >
      {Object.entries(menuData).map(([sectionName, sectionItems]) => (
        <div key={sectionName} className="mb-2">
          <h2
            className={cn(
              "text-sm font-semibold text-foreground-muted uppercase mb-2",
              isSidebarOpen ? "block" : "hidden"
            )}
          >
            {sectionName}
          </h2>
          <ul>
            {Object.entries(sectionItems).map(([itemName, item]) => (
              <li key={itemName} className="mb-2">
                <Tooltip
                  text={item.label}
                  direction="right"
                  extraClasses="w-full"
                  key={itemName}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-4 rounded-lg p-2 transition-all hover:bg-background",
                      "text-foreground-muted hover:text-foreground",
                      "w-full",
                      isSidebarOpen ? "justify-start" : "justify-center",
                      pathname === item.href && "text-accent-blue"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span
                      className={cn(
                        "block",
                        isSidebarOpen ? "block" : "hidden"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SideBarMenu;

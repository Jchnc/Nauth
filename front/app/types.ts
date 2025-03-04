import { LucideIcon } from "lucide-react";

export type MenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type MenuSection = {
  [key: string]: MenuItem;
};

export type MenuData = {
  [key: string]: MenuSection;
};

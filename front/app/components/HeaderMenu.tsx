import React from "react";

interface HeaderProps {
  title: string;
}

const HeaderMenu: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="border-b border-border px-10 min-h-16 max-h-16 flex items-center justify-between bg-background-lighter">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
    </header>
  );
};

export default HeaderMenu;

import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import SideBarMenu from "./SidebarMenu";
import UserProfileBody from "./UserProfileBody";
import UserProfileHeader from "./UserProfileHeader";

interface AsideProps {
  user: {
    name: string;
  };
  handleSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

const Aside: React.FC<AsideProps> = ({
  user,
  handleSidebarToggle,
  isSidebarOpen,
}) => {
  const [isUserBodyOpen, setIsUserBodyOpen] = useState(false);

  return (
    <aside className="bg-background-lighter border-r border-border">
      <div className="gap-2 grid grid-cols-[40px_1fr] items-center p-2 min-h-16 border-b border-border">
        <button
          onClick={handleSidebarToggle}
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

      <UserProfileHeader
        label={user.name}
        isSidebarHidden={!isSidebarOpen}
        onClick={() => setIsUserBodyOpen(!isUserBodyOpen)}
      />
      <UserProfileBody isUserBodyOpen={isUserBodyOpen} />

      <hr className="border-border border-t-1 w-full" />

      <SideBarMenu isSidebarOpen={isSidebarOpen} />
    </aside>
  );
};

export default Aside;

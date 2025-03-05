import { useState, useEffect } from "react";

const useSidebarState = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIsSidebarOpen = localStorage.getItem("isSidebarOpen");
      setIsSidebarOpen(
        storedIsSidebarOpen ? JSON.parse(storedIsSidebarOpen) : false
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen));
    }
  }, [isSidebarOpen]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return { isSidebarOpen, handleSidebarToggle };
};

export default useSidebarState;

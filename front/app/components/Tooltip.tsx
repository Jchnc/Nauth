import { cn } from "@/app/lib/utils";
import React, { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  direction?: "top" | "bottom" | "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  direction = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const tooltipDirectionClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
  };

  const arrowDirectionClasses = {
    top: "-bottom-1 left-1/2 transform -translate-x-1/2 rotate-45",
    bottom: "-top-1 left-1/2 transform -translate-x-1/2 rotate-45",
    left: "-right-1 top-1/2 transform -translate-y-1/2 rotate-45",
    right: "-left-1 top-1/2 transform -translate-y-1/2 rotate-45",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-3 py-2 text-sm text-text-dark-0 bg-dark-2 rounded-lg shadow-md",
            tooltipDirectionClasses[direction]
          )}
        >
          {text}
          <div
            className={cn(
              "absolute w-2 h-2 bg-dark-2",
              arrowDirectionClasses[direction]
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;

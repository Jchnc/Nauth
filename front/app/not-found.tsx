import { cn } from "@/app/lib/utils";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
const Custom404 = () => {
  return (
    <div className={cn(
      "min-h-screen flex flex-col items-center justify-center",
      "bg-background text-white"
    )}>
      <div className="relative">
        <h2
          className={cn(
            "text-9xl font-bold text-transparent bg-clip-text",
            "bg-gradient-to-r from-accent-blue to-accent-blue-muted animate-pulse"
          )}
        >
          404
        </h2>
        <div
          className={cn(
            "absolute inset-0 blur-2xl opacity-30 animate-pulse",
            "bg-gradient-to-r from-accent-blue to-accent-blue-muted"
          )}
        ></div>
      </div>
      <h2 className="text-3xl font-semibold mt-4 text-gray-300">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-gray-400 mt-2 text-center">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className={cn(
          "mt-8 px-6 py-3 font-semibold rounded-md shadow-lg transition-all duration-300 transform",
          "bg-gradient-to-r bg-accent-blue hover:bg-accent-blue-muted text-foreground",
          "flex items-center gap-2"
        )}
      >
        <ArrowLeft size={20} />
        Go Back Home
      </Link>
    </div>
  );
};

export default Custom404;

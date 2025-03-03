import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Dark Theme Colors
        "dark-0": "#0f1214", // Background DARK 0
        "dark-1": "#151518", // Background DARK 1
        "dark-2": "#3d47514d", // Borders DARK 2
        "dark-2-hover": "#1d2126", // Hover (with 50% opacity)
        "dark-3": "#101316", // Background DARK 3
        "text-dark-0": "#b6bec9", // Text DARK
        "text-dark-1": "#f6f7f8", // Text DARK
      },
    },
  },
  plugins: [],
} satisfies Config;

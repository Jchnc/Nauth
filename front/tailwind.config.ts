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
        background: {
          DEFAULT: "#080a0e",
          lighter: "#0f1117",
        },
        foreground: {
          DEFAULT: "#e6e9ef",
          muted: "#8a91a4",
        },
        accent: {
          blue: {
            DEFAULT: "#3291ff",
            muted: "#0070f3",
          },
        },
        border: {
          DEFAULT: "#1a1e27",
          light: "#2a2f3a",
        },
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#143D2B",
          50: "#f0f7f3",
          100: "#dbeef1",
          200: "#b8dfc7",
          300: "#8ac9a3",
          400: "#55ad7b",
          500: "#2e915b",
          600: "#1b7345",
          700: "#175b38",
          800: "#143D2B", // Brand Kaziranga Green
          900: "#0c271b",
          950: "#06150e",
        },
        muga: {
          DEFAULT: "#D4A338",
          50: "#fbf8ee",
          100: "#f6eed4",
          200: "#eddbab",
          300: "#e1c37b",
          400: "#D4A338", // Brand Muga Silk Gold
          500: "#bf8b2a",
          600: "#a36e22",
          700: "#82501e",
          800: "#6d411e",
          900: "#5d371d",
        },
        ivory: {
          DEFAULT: "#FBF9F4",
          50: "#ffffff",
          100: "#FBF9F4", // Brand Warm Ivory
          200: "#f5f0e4",
          300: "#ece2cb",
          400: "#deceab",
        },
        terracotta: {
          DEFAULT: "#B85D38",
          50: "#fbf5f2",
          100: "#f6e8e2",
          500: "#B85D38",
          600: "#9c4826",
          700: "#7d381c",
        },
        sage: {
          DEFAULT: "#E8EFE9",
          50: "#f4f7f4",
          100: "#E8EFE9",
          200: "#d3ded5",
          300: "#b4c5b7",
          500: "#7b9881",
        },
        charcoal: {
          DEFAULT: "#212529",
          50: "#f8f9fa",
          100: "#f1f3f5",
          700: "#495057",
          800: "#343a40",
          900: "#212529",
        },
        gamusa: {
          red: "#C72C35",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        brand: "0 4px 20px -2px rgba(20, 61, 43, 0.08)",
        "brand-lg": "0 10px 30px -4px rgba(20, 61, 43, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

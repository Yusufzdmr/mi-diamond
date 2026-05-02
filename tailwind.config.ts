import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B1A2F",
          50: "#F2F5F9",
          100: "#DCE3EE",
          200: "#A9B6CC",
          300: "#7689AB",
          400: "#445D89",
          500: "#1F3460",
          600: "#152544",
          700: "#0B1A2F",
          800: "#07111F",
          900: "#040A14",
        },
        gold: {
          DEFAULT: "#C9A24A",
          50: "#FBF6E9",
          100: "#F4E8C2",
          200: "#E9D38A",
          300: "#DCBB58",
          400: "#C9A24A",
          500: "#A8842F",
          600: "#866921",
          700: "#634D17",
          800: "#41320E",
          900: "#221A06",
        },
        cream: "#FBF8F2",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(11, 26, 47, 0.12)",
        gold: "0 8px 32px -12px rgba(201, 162, 74, 0.45)",
      },
    },
  },
  plugins: [],
} satisfies Config;

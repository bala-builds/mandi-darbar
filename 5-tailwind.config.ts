import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: "#16120F", char: "#FAF6EE", char2: "#FFFFFF", saffron: "#9C3D1E", copper: "#9C4A26", cream: "#1F1A15", olive: "#6B7B3A" },
    fontFamily: { serif: ["Georgia", "'Times New Roman'", "serif"], sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"] },
  } },
  plugins: [],
} satisfies Config;

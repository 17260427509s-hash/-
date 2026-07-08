import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        court: { 950: "#030711", 900: "#061124", 800: "#0a1d3a", 700: "#102d52" },
        gold: { 300: "#ffe8a3", 400: "#f8c95b", 500: "#d9a52f" },
        cyanfire: "#35d9ff",
        dangerline: "#ff653d"
      },
      boxShadow: {
        glow: "0 0 28px rgba(248, 201, 91, 0.38)",
        cyan: "0 0 24px rgba(53, 217, 255, 0.35)",
        card: "0 30px 80px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.18)"
      },
      fontFamily: {
        sans: ["Arial", "PingFang SC", "Microsoft YaHei", "system-ui", "sans-serif"]
      },
      keyframes: {
        scan: { "0%": { transform: "translateY(-120%)" }, "100%": { transform: "translateY(120%)" } },
        pulseLine: { "0%, 100%": { opacity: "0.18", transform: "scaleX(0.92)" }, "50%": { opacity: "0.85", transform: "scaleX(1)" } },
        shuttle: { "0%": { transform: "translate(-30%, 20%) rotate(-18deg)", opacity: "0" }, "20%": { opacity: "1" }, "100%": { transform: "translate(130%, -70%) rotate(26deg)", opacity: "0" } }
      },
      animation: {
        scan: "scan 2.6s linear infinite",
        pulseLine: "pulseLine 1.8s ease-in-out infinite",
        shuttle: "shuttle 3.2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

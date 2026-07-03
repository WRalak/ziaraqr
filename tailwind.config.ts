import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0b",
        "bg-2": "#111113",
        card: "#17171a",
        "card-2": "#1c1c1f",
        line: "rgba(255,255,255,0.09)",
        "line-strong": "rgba(255,255,255,0.16)",
        text: "#f6f4ee",
        "text-dim": "rgba(246,244,238,0.62)",
        "text-faint": "rgba(246,244,238,0.38)",
        gold: "#FFB800",
        "gold-2": "#e2a300",
        "gold-wash": "rgba(255,184,0,0.13)",
        "gold-line": "rgba(255,184,0,0.35)",
      },
      borderRadius: {
        xl2: "30px",
        lg2: "22px",
        md2: "16px",
        sm2: "11px",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        cond: ["var(--font-cond)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        pulse2: {
          "0%": { boxShadow: "0 0 0 0 rgba(74,222,128,.55)" },
          "70%": { boxShadow: "0 0 0 6px rgba(74,222,128,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(74,222,128,0)" },
        },
        pop: {
          from: { transform: "scale(0.5)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        pulse2: "pulse2 1.8s infinite",
        pop: "pop .5s cubic-bezier(.34,1.56,.64,1)",
      },
    },
  },
  plugins: [],
};
export default config;

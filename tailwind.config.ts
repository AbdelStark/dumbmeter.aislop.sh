import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg))",
        paper: "rgb(var(--paper))",
        fg: "rgb(var(--fg))",
        muted: "rgb(var(--muted))",
        border: "rgb(var(--border))",
        accent: "rgb(var(--accent))",
        sharp: "rgb(var(--sharp))",
        normal: "rgb(var(--normal))",
        sus: "rgb(var(--sus))",
        panic: "rgb(var(--panic))",
        info: "rgb(var(--info))",
        success: "rgb(var(--success))",
        warning: "rgb(var(--warning))",
        danger: "rgb(var(--danger))",
      },
      boxShadow: {
        dm: "var(--shadow-strong)",
        "dm-hover": "var(--shadow-hover)",
        "dm-press": "var(--shadow-press)",
      },
      borderRadius: {
        dm0: "var(--radius-0)",
        dm1: "var(--radius-1)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Reference CSS variables directly
        "accent-1": "var(--green-1)",
        "accent-2": "var(--green-2)",
        "accent-3": "var(--green-3)",
        "accent-4": "var(--green-4)",
        "accent-5": "var(--green-5)",
        "accent-6": "var(--green-6)",
        "accent-7": "var(--green-7)",
        "accent-8": "var(--green-8)",
        "accent-9": "var(--green-9)",
        "accent-10": "var(--green-10)",
        "accent-11": "var(--green-11)",
        "accent-12": "var(--green-12)",

        "gray-1": "var(--gray-1)",
        "gray-2": "var(--gray-2)",
        "gray-3": "var(--gray-3)",
        "gray-4": "var(--gray-4)",
        "gray-5": "var(--gray-5)",
        "gray-6": "var(--gray-6)",
        "gray-7": "var(--gray-7)",
        "gray-8": "var(--gray-8)",
        "gray-9": "var(--gray-9)",
        "gray-10": "var(--gray-10)",
        "gray-11": "var(--gray-11)",
        "gray-12": "var(--gray-12)",

        background: "var(--color-background)",
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },

      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        section: "var(--section)",
        body: "var(--body)",
        input: "var(--body)",
        "section-light": "var(--section)",
        text: "var(--text)",
        border: "var(--border)",
        "card-light": "var(--card-light)",
        "dark-text": "var(--text-sub)",
        "button-bg": "var(--button-bg)",
        "button-hover": "var(--button-hover)",
        "text-disabled": "var(--text-disabled)",
      },
    },
  },
  plugins: [],
};

export default config;

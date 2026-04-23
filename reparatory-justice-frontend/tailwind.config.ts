import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#003865", // Institutional Blue
          light: "#005a9c",
          dark: "#002140",
        },
        accent: {
          DEFAULT: "#D4AF37", // Gold
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;

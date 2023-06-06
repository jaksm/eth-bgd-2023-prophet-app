import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      mono: ["Roboto Mono", ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [require("tailwindcss-hero-patterns")],
} satisfies Config;

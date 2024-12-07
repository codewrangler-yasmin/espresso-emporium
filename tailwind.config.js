/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-navbar": 'url("/src/assets/images/more/15.jpg")',
        "custom-footer": 'url("/src/assets/images/more/13.jpg")',
        "custom-outlet": 'url("/src/assets/images/more/11.png")',
        "custom-copyright": 'url("/src/assets/images/more/24.jpg")',
        banner: 'url("/src/assets/images/more/3.png")',
        "custom-home": 'url("/src/assets/images/more/1.png")',
      },
      fontFamily: {
        title: '"Rancho", cursive',
        accent: '"Raleway", sans-serif',
      },
      colors: {
        coffee: "#331A15",
        beige: "#F4F3F0",
        brown: {
          500: "#C6A27E",
          600: "#B18C6B",
          300: "#E5D2C2",
        },
      },
      textShadow: {
        sm: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        DEFAULT: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.9)",
      },
    },
  },
  plugins: [
    daisyui,
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-sm": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        },
        ".text-shadow-lg": {
          textShadow: "3px 3px 6px rgba(0, 0, 0, 0.9)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
      });
    },
  ],
};

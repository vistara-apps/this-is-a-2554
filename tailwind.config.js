/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(222, 47%, 11%)",
        accent: "hsl(217, 91%, 60%)",
        success: "hsl(142, 70%, 50%)",
        danger: "hsl(0, 72%, 54%)",
        surface: "hsl(0, 0%, 100%)",
        bg: "hsl(0, 0%, 98%)",
        purple: {
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95"
        }
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px"
      },
      spacing: {
        xs: "4px",
        sm: "8px", 
        md: "16px",
        lg: "24px",
        xl: "32px"
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
      }
    },
  },
  plugins: [],
}
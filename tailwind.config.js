const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: "#1D4ED8",
        "h-primary": "#1E3A8A",
        "t-primary": "white",
        success: "#84CC16",
        "h-success": "#4D7C0F",
        "t-success": "white",
        warning: "#FACC15",
        "h-warning": "#CA8A04",
        "t-warning": "white",
        danger: "#DC2626",
        "h-danger": "#991B1B",
        "t-danger": "white",
        elevated: "white",
        "h-elevated": "#9CA3AF",
        "t-elevated": "black",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        18: "4.5rem",
        inherit: "inherit",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};

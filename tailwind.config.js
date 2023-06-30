/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    styled: true,
    themes: ["bumblebee", "night"],
    theme: "bumblebee",
    darkTheme: "night",
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
  plugins: [require("daisyui")],
};

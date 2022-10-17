/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "body-text": "#353535",
        secondary: "#E91E63",
        background: "#dddddd",
      },
    },
    fontSize: {
      xs: "0.6rem",
      sm: "0.8rem",
      lg: "1.1rem",
      base: "1rem",
      xl: "1.25rem",
    },
    fontFamily: {
      sans: ["Fira Code", "ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ["Roboto", "Open Sans"],
    },
  },
  plugins: [],
}

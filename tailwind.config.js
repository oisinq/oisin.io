const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./_site/**/*.{html, njk}"],
  theme: {
    extend: {
      colors: {
        "pastel-green": {
          DEFAULT: "#DDE9CD",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#F0F5E9",
          500: "#DDE9CD",
          600: "#C3D8A6",
          700: "#A8C77F",
          800: "#8EB658",
          900: "#719441",
        },
        "pastel-pink": {
          DEFAULT: "#F9D6D6",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FEFAFA",
          500: "#F9D6D6",
          600: "#F2A5A5",
          700: "#EB7474",
          800: "#E44343",
          900: "#D01E1E",
        },
        "pastel-yellow": {
          DEFAULT: "#FFFEDB",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#FFFEDB",
          600: "#FFFCA3",
          700: "#FFFB6B",
          800: "#FFF933",
          900: "#FAF300",
        },
        "pastel-blue": {
          DEFAULT: "#C7FFFC",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#F0FFFE",
          400: "#DBFFFD",
          500: "#C7FFFC",
          600: "#8FFFF9",
          700: "#57FFF6",
          800: "#1FFFF3",
          900: "#00E6D9",
        },
        "pastel-pink": {
          DEFAULT: "#FFE5FC",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#FFE5FC",
          600: "#FFADF6",
          700: "#FF75EF",
          800: "#FF3DE9",
          900: "#FF05E2",
        },
        "custom-grey": "#3A3A3A",
      },
      fontFamily: {
        h1: ["Fredoka One", ...defaultTheme.fontFamily.sans],
        sans: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        prose: "42rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

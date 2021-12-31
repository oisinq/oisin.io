const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./**/*.{html, njk}"],
  theme: {
    extend: {
      colors: {
        "pastel-green": "#DDE9CD",
        "pastel-pink": "#F9D6D6",
        "pastel-yellow": "#FFFEDB",
        "pastel-blue": "#C7FFFC",
        "pastel-pink": "#FFE5FC",
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

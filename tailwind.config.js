/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "league-spartan": ["LeagueSpartan_400Regular", "sans-serif"],
        "league-spartan-thin": ["LeagueSpartan_100Thin", "sans-serif"],
        "league-spartan-extralight": [
          "LeagueSpartan_200ExtraLight",
          "sans-serif",
        ],
        "league-spartan-light": ["LeagueSpartan_300Light", "sans-serif"],
        "league-spartan-medium": ["LeagueSpartan_500Medium", "sans-serif"],
        "league-spartan-semibold": ["LeagueSpartan_600SemiBold", "sans-serif"],
        "league-spartan-bold": ["LeagueSpartan_700Bold", "sans-serif"],
        "league-spartan-extrabold": [
          "LeagueSpartan_800ExtraBold",
          "sans-serif",
        ],
        "league-spartan-black": ["LeagueSpartan_900Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};

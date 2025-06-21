
// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // si tu utilises app router
    "./components/**/*.{js,jsx,ts,tsx}",
   // "./pages/**/*.{js,jsx,ts,tsx}", // si tu as des pages classiques
  ],
  theme: {
    extend: {
      colors: {
        primaryBG: "#FCFAF5",     // Exemple : un bleu perso
        buttonBG: "#FFF8E6",   // Exemple : un jaune
        accent: "#000000",      // Exemple : un vert
        // Ajoute d’autres couleurs ici
      },
      fontFamily: {
        anon: ['var(--font-anon)', 'monospace'],
      },
    },
  },
  plugins: [],
};
 
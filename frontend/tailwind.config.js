/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-primeui")],
  corePlugins: {
    preflight: false, // This ensures Tailwind doesn't override PrimeNG styles
  },
};

const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(), // Asegúrate de incluir las rutas adecuadas de Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // Agrega el plugin de Flowbite
  ],
};

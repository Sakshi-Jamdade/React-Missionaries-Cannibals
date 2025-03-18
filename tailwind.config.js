/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
      extend: {
        borderColor: {
          border: "hsl(var(--border))",
        },
      },
    },
    plugins: [],
  };
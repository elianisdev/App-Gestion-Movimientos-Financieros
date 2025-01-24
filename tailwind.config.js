/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Archivos que Tailwind procesará
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
        serif: ['Georgia', 'ui-serif', 'serif'],
        mono: ['Menlo', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

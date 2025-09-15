/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#64a19d',
        secondary: '#60a5fa',
        accent: '#67c29c',
        dark: '#212529',
      },
      fontFamily: {
        'heading': ['Varela Round', 'sans-serif'],
        'body': ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
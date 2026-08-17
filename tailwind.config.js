/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0B101D',
        'brand-card': '#131B31',
        'brand-border': '#243257',
        'brand-purple': '#6D28D9',
        'brand-green': '#00C853',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderColor: {
        brand: '#243257',
      },
    },
  },
  plugins: [],
}

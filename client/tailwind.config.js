/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        primary: 'Orbitron',
      secondary: 'Rajdhani',
      tertiary: 'Aldrich',
      quad : 'Kaushan Script',
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    backgroundImage:{
      site : "url('./assets/tasksbg.png')"
    }
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
    
      backgroundImage:{
        'inicio':'url(https://i.ibb.co/Db5QJDD/barberia-home-minif.webp)'
      },
      fontFamily:{
        monsterrat:[ 'Montserrat', 'sans-serif']
      },
    },
  },
  plugins: [],
}
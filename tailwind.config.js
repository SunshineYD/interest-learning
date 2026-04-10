/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3399FF',
        secondary: '#FF9933',
        success: '#33CC66',
        warning: '#FFCC33',
        danger: '#FF6666',
      },
      fontSize: {
        'child': '14px',
      },
      textColor: {
        default: '#333333',
      },
      backgroundColor: {
        default: '#F5F5F5',
      }
    },
  },
  plugins: [],
}

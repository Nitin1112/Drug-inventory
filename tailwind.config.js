/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // colors:{
    //   'primary': '#164e63',
    // },
    extend: {
      backgroundColor: {
        "ice-blue": "#EDF1F5",
      },

    },
  },
  plugins: [],
}


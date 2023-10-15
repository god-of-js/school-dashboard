/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        danger: "#EB5757",
        primary: "#007AFF",
        "danger-100": "#EB575710",
        "gray-25": "#F9F9F9",
        "gray-50": "#F2F2F2",
        "gray-100": "#e5e5e5",
        "gray-200": "#CCCCCC",
        "gray-300": "#B3B3B3",
        "gray": "#808080"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans'],
      },
    },
  },
  plugins: [],
}


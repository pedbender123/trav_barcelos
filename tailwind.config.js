/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A", // Azul Meia-Noite
        secondary: "#2563EB", // Azul Real Vibrante
        accent: "#38BDF8", // Azul Celeste
        background: "#F8FAFC", // Cinza Gelo
        surface: "#FFFFFF",
        alert: "#F59E0B",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Lato', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}

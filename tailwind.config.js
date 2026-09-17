/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#edfdf9',
          100: '#d2f8ef',
          500: '#16a085',
          600: '#0f8f7b',
          700: '#0c6f62',
          900: '#0b3f38'
        },
        ink: '#0f172a',
        mist: '#f8fafc'
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.04)'
      }
    }
  },
  plugins: []
}

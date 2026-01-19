/** @type {import('tailwindcss').Config} */
// This file is generated from design/design-system.json - DO NOT EDIT MANUALLY
// Run: npm run generate:tailwind
// Source of truth: design/design-system.json
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'olive-green': '#6B8E23',
        'warm-off-white': '#FAF8F3',
        'soft-charcoal': '#2C2C2C',
        'deep-olive': '#3D4A2E',
        'muted-gold': '#C9A961',
        'white': '#FFFFFF',
      },
      fontFamily: {
        'serif': ['serif'],
        'sans': ['sans-serif'],
        'modern': ["-apple-system","BlinkMacSystemFont","Inter","Segoe UI","Roboto","Helvetica Neue","Arial","sans-serif"],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
    },
  },
  plugins: [],
}

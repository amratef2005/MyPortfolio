/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#06080d',
          900: '#0a0d14',
          850: '#0f1420',
          800: '#151b2b',
          700: '#1e293b',
        },
        cyber: {
          cyan: '#38bdf8',
          blue: '#3b82f6',
          indigo: '#6366f1',
          violet: '#8b5cf6',
          emerald: '#10b981',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

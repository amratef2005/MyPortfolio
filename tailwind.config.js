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
          950: '#000000',
          900: '#060608',
          850: '#0c0d10',
          800: '#121318',
          750: '#181920',
          700: '#22232c',
        },
        orange: {
          brand: '#FF5722',
          burnt: '#E64A19',
          amber: '#FF7A00',
          light: '#FF8A00',
          fire: '#FF3D00',
        },
        cyber: {
          orange: '#FF5722',
          amber: '#FF7A00',
          crimson: '#E64A19',
          gold: '#FFA726',
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        sans: ['Inter', 'Cairo', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.08)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

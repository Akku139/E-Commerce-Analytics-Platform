/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#09090b",       // Zinc 950 / Vercel black
          card: "rgba(24, 24, 27, 0.65)", // Zinc 900 / translucent card
          border: "rgba(39, 39, 42, 0.4)", // Zinc 800 / thin borders
          text: "#f4f4f5",     // Zinc 100 / primary text
          muted: "#a1a1aa",    // Zinc 400 / secondary text
          dim: "#71717a",      // Zinc 500 / muted metadata
        },
        accent: {
          indigo: "#6366f1",
          emerald: "#10b981",
          rose: "#f43f5e",
          amber: "#f59e0b",
          violet: "#8b5cf6",
          cyan: "#06b6d4"
        }
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}

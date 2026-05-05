/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          '50': '#f8f7ff',
          '100': '#f0eeff',
          '200': '#e6e1ff',
          '300': '#d4c9ff',
          '400': '#b8a8ff',
          '500': '#9d88ff',
          '600': '#8b6ff9',
          '700': '#7c3aed',
          '800': '#6d28d9',
          '900': '#5b21b6',
        },
        'primary': '#7c3aed',
        'primary-light': '#a78bfa',
        'primary-dark': '#6d28d9',
        'accent': '#06b6d4',
        'success': '#10b981',
        'warning': '#f59e0b',
        'danger': '#ef4444',
        'neutral': '#6b7280',
      },
      backgroundColor: {
        'base': '#080812',
        'surface': '#0f0f1a',
        'card': '#13131f',
        'hover': '#1a1a2e',
      },
      textColor: {
        'primary': '#f1f0ff',
        'secondary': '#9d9db8',
        'tertiary': '#6b7280',
      },
      borderColor: {
        'primary': 'rgba(124, 58, 237, 0.2)',
        'hover': 'rgba(124, 58, 237, 0.4)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-lg': '0 0 40px rgba(124, 58, 237, 0.5)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(124, 58, 237, 0.2)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease forwards',
        'scale-in': 'scaleIn 0.3s ease forwards',
      },
      keyframes: {
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124,58,237,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(124,58,237,0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateX(-20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
      },
      fontFamily: {
        'display': ['Syne', 'sans-serif'],
        'sans': ['DM Sans', 'sans-serif'],
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

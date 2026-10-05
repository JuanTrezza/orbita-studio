import tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0E0F0C',
        surface: {
          lowest: '#0E0F0C',
          low: '#151713',
          DEFAULT: '#191B16',
          high: '#22251F',
          highest: '#2D3028',
          border: '#5C5E57',
        },
        primary: {
          DEFAULT: '#EDEDE6',
          foreground: '#0E0F0C',
          container: '#C6FF3D',
          'on-container': '#141F00',
        },
        accent: {
          DEFAULT: '#C6FF3D',
          hover: '#d5ff66',
          muted: '#8cb81b',
        },
        muted: {
          DEFAULT: '#5C5E57',
          light: '#8D937B',
          foreground: '#A6A99E',
        },
        bone: '#EDEDE6',
        obsidian: '#0E0F0C',
        mineral: '#5C5E57',
        acid: '#C6FF3D',
      },
      fontFamily: {
        display: ['Unbounded', 'Syne', 'sans-serif'],
        headline: ['Unbounded', 'Syne', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'pulse-slow': 'pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [tailwindAnimate],
};

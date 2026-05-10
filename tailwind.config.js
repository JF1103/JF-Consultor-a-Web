/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Fraunces', 'serif'],
      },
      colors: {
        slate: {
          deep: '#0F1923',
          DEFAULT: '#1E2A38',
          mid: '#253345',
          light: '#2D3E50',
        },
        chrome: {
          DEFAULT: '#A0AEC0',
          dim: '#718096',
        },
        sky: {
          DEFAULT: '#56CCF2',
          dim: '#2BB5E0',
        },
        periwinkle: {
          DEFAULT: '#7B61FF',
          dim: '#6048E8',
        },
        frost: {
          DEFAULT: '#F7FAFC',
          dim: '#E2E8F0',
        },
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(247,250,252,0.06) 0%, rgba(247,250,252,0.02) 100%)',
        'sky-gradient': 'linear-gradient(135deg, #56CCF2 0%, #7B61FF 100%)',
        'slate-gradient': 'linear-gradient(180deg, #0F1923 0%, #1E2A38 50%, #0F1923 100%)',
      },
      boxShadow: {
        'glow-sky': '0 0 24px rgba(86, 204, 242, 0.35)',
        'glow-periwinkle': '0 0 24px rgba(123, 97, 255, 0.35)',
        'glass': '0 4px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      animation: {
        'float-a': 'float-a 7s ease-in-out infinite',
        'float-b': 'float-b 9s ease-in-out infinite',
        'float-c': 'float-c 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
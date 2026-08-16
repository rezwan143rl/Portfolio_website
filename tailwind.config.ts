import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0C',
        surface: '#121215',
        surface2: '#18181C',
        border: '#232327',
        text: '#EDEDEA',
        muted: '#8B8B92',
        signal: '#E3A857', // amber accent — status, links, featured markers
        blueprint: '#4C6EF5', // cool blue used only in grid/annotation lines
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      backgroundImage: {
        grid:
          'linear-gradient(rgba(76,110,245,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(76,110,245,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#000000',
          light: '#121212'
        },
        primary: {
          DEFAULT: '#0A84FF',
          hover: '#007AFF',
          light: '#5AC8FA',
          dark: '#0055FF'
        },
        secondary: {
          DEFAULT: '#34C759',
          hover: '#30B955',
          light: '#4CD964',
          dark: '#248A3D'
        },
        accent: {
          heart: '#FF2D55',
          sleep: '#AF52DE',
          oxygen: '#5AC8FA',
          activity: '#FF9500',
          stress: '#FFD60A'
        },
        neutral: {
          100: '#F5F5F7',
          200: '#E5E5EA',
          300: '#D1D1D6',
          400: '#C7C7CC',
          500: '#AEAEB2',
          600: '#8E8E93',
          700: '#636366',
          800: '#48484A',
          900: '#3A3A3C',
          950: '#1C1C1E'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(10, 132, 255, 0.5)',
      }
    },
  },
  plugins: [],
};
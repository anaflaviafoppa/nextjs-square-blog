/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'cell': '576px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    container: {
      padding: {
        DEFAULT: '1.6rem',
        'cell': '1.6rem',
        'laptop': '8rem',
        'desktop':'8rem',
        '2xl': '10rem',
      },
    },
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        'main-yellow': '#FEBD1D'
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.5,
        large: 1.5,
      },
      fontSize: {
        sm: '1.2rem',
        base: '1.6rem',
        '2xl': '2rem',
        '5xl': '1.8rem',
        '6xl': '2.4rem',
        '7xl': '4rem',
        '8xl': '4.8rem',
        '9xl': '6rem'
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}

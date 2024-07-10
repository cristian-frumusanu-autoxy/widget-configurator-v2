/** @type {import('tailwindcss').Config} */
const colors = {
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#141414',
  gray: '#E2E5E9',
  'gray-base': '#414B58',
  slate: {
    50: '#F9FAFB',
    100: '#E2E5E9',
    200: '#C4CBD4',
    300: '#A7B1BE',
    400: '#8997A9',
    500: '#6C7D93',
    600: '#566476',
    700: '#414B58',
    800: '#2B323B',
    900: '#16191D',
    901: '#E9E9E9',
    902: '#C9D6E9',
  },
  blue: {
    100: '#295CA7',
  },
  orange: {
    100: '#E08528',
  },
  red: '#D52A2B',
  'bg-red': '#FDF2F2',
  'bg-color': '#FDF2F2',
  'border-red': '#EAA',
};

export default {
  prefix: 'tw-',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': 'Verdana, sans-serif',
    },
    extend: {
      ringWidth: {
        '1': '1px',
      },
      fontWeight: {
        inherit: 'inherit',
      },
    },
    fontSize: {
      '2xs': '0.625rem', // 10px
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem', // 72px
      '8xl': '6rem', // 96px
      '9xl': '8rem', // 128px
    },
    spacing: {
      px: '1px',
      0: '0',
      1: '0.25rem', // 4px
      2: '0.5rem', // 8px
      3: '0.75rem', // 12px
      4: '1rem', // 16px
      6: '1.5rem', // 24px
      8: '2rem', // 32px
      10: '2.5rem', // 40px
      12: '3rem', // 48px
      14: '3.5rem', // 56px
      16: '4rem', // 64px
      18: '4.5rem', // 72px
      20: '5rem', // 80px
      24: '6rem', // 96px
      26: '6.5rem', // 104px
      32: '8rem', // 128px
      36: '9rem', // 144px
      43: '10.75rem', // 172px
      64: '16rem', // 256px
      header: '72px',
      'icon-lg': '36px',
      'icon-xs': '18px',
    },
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      'max-md': [
        {
          max: '768px',
        },
      ],
    },
    colors,
    lineHeight: {
      '2xs': '16px',
      xs: '20px',
      sm: '24px',
      base: '28px',
      lg: '32px',
      xl: '36px',
      '2xl': '40px',
      '3xl': '48px',
      '4xl': '75px',
      1: '1',
    },
  },
  plugins: [],
};

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{vue,js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


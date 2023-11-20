/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    minHeight: {
      '100': '100px',
      '200': '200px',
      '300': '300px',
      '330': '330px',
      '400': '400px',
      '500': '500px',
      '600': '600px',
      '700': '700px',
      '800': '800px',
      '900': '900px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      sm: '300px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    }
  },
  plugins: [],
}

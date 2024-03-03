import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      red: '#ff0000',
      primary: {
        '50': '#ffffe5',
        '100': '#fdffc7',
        '200': '#f9ff95',
        '300': '#f0fe58',
        '400': '#e1f51f',
        '500': '#c4dc06',
        '600': '#99b000',
        '700': '#728506',
        '800': '#5b690b',
        '900': '#4b580f',
        '950': '#283201',
      },
      secondary: {
        '50': '#f0fdf9',
        '100': '#cdfaee',
        '200': '#9cf3dd',
        '300': '#62e6ca',
        '400': '#32cfb3',
        '500': '#19b39a',
        '600': '#11907e',
        '700': '#127367',
        '800': '#135c53',
        '900': '#154c46',
        '950': '#052c29',
      },
      inactive: {
        '50': '#f6f6f6',
        '100': '#e7e7e7',
        '200': '#d1d1d1',
        '300': '#b0b0b0',
        '400': '#888888',
        '500': '#6d6d6d',
        '600': '#5a5a5a',
        '700': '#4f4f4f',
        '800': '#454545',
        '900': '#3d3d3d',
        '950': '#262626',
      },
    },
  },
  plugins: [],
}
export default config

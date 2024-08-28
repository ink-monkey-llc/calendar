import type { Config } from 'tailwindcss'

const config: Config = {
 content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
 theme: {
  extend: {
   colors: {
    'var-orange': '#F7921D',
    'var-red': '#ED2024',
    'var-sky': '#3FBAEB',
    'var-yellow': '#F4D90D',
    'var-blue': '#3D58A7',
    'var-pink': '#EE3291',
    'var-light-pink': '#F4BAD5',
    'var-purple': '#8E4E9F',
    'var-white': '#D8D9D9',
    'var-green': '#178942',
   },
  },
 },
 plugins: [],
}
export default config

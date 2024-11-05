import type { Config } from 'tailwindcss'

const config: Config = {
 content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
 theme: {
  extend: {
   colors: {
    'var-bg': '#1e1e1e',
    'var-bg-dark': '#0a0a0a',
    'var-bg-sec': '#2b2b2b',
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
    'var-ad-text': '#E6BE54',
    'var-ad-hover': '#FCC000',
    'var-dec-hover': '#5bdee2',
    'var-win-hover': '#c95fd1',
    'var-card-hover': '#4b68b3',
    'var-truck-hover': '#fd9760',
   },
  },
  screens: {
   'lg-mb': '500px',
   tablet: '780px',
   desktop: '1221px',
  },
 },
 plugins: [],
}
export default config

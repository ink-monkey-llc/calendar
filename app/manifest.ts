import { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest {
 return {
  name: 'Calendar',
  short_name: 'CalApp',
  description: 'A Progressive Web App built with Next.js',
  start_url: '/',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#000000',
  icons: [
   {
    src: '/icon_192.png',
    sizes: '192x192',
    type: 'image/png',
   },
   {
    src: '/icon_512.png',
    sizes: '512x512',
    type: 'image/png',
   },
  ],
 }
}

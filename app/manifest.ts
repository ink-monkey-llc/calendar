import { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Calendar',
        short_name: 'CalApp',
        description: 'A Calendar App by Ink Monkey',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/icon_256.png',
                sizes: '256x256',
                type: 'image/png',
            },

            {
                src: '/favicon.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    }
}

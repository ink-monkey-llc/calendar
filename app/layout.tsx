import type { Metadata } from 'next'
import { Inter, Days_One, Figtree } from 'next/font/google'
import { cn } from './lib/utils'
import { Providers } from './lib/rq/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const daysOne = Days_One({ subsets: ['latin'], weight: '400' })
const figtree = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
 title: 'The Calendar',
 description: 'The Calendar by Ink Monkey',
}

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode
}>) {
 return (
  <html lang='en'>
   <body
    style={{ '--accent-hsl': 'var(--blue-hsl)' }}
    className={cn(inter.className, 'relative')}>
    <Providers>{children}</Providers>
   </body>
  </html>
 )
}

// added new env vars to vercel, pushing to github

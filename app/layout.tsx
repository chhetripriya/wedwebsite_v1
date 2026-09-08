import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
})

export const metadata: Metadata = {
  title: 'Priya & Sunil | 22 November 2026',
  description:
    'You are warmly invited to celebrate the wedding of Priya Chhetri and Sunil Tandon at Lakshmi Farmhouse. Mehendi, Haldi, Sangeet, Wedding and Reception details, RSVP and more.',
  generator: 'v0.app',
  openGraph: {
    title: 'Priya & Sunil are getting married',
    description: 'Join us on 22 November 2026 at Lakshmi Farmhouse.',
    images: ['/images/pastel-florals.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFF8F3',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${greatVibes.variable}`}>
      <body className="antialiased font-serif">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

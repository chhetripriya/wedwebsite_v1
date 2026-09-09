import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Allura, DM_Sans, Playfair_Display, Tiro_Devanagari_Sanskrit } from 'next/font/google'
import './globals.css'

const tiroDevanagari = Tiro_Devanagari_Sanskrit({
  subsets: ['devanagari'],
  weight: '400',
  variable: '--font-devanagari',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const allura = Allura({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
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
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
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
    <html lang="en" className={`${playfair.variable} ${allura.variable} ${dmSans.variable} ${tiroDevanagari.variable}`}>
      <body className="antialiased font-sans">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body>
    </html>
  )
}

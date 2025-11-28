import './globals.css'
import {IBM_Plex_Mono, Inter, PT_Serif} from 'next/font/google'
import {Metadata, Viewport} from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Hon. Dr. Ghali Mustapha Tijjani Phanda - Representative for Gaya/Ajingi/Albasu',
    template: '%s | Hon. Dr. Ghali Panda',
  },
  description:
    'Official website of Hon. Dr. Ghali Mustapha Tijjani Phanda - Member representing Gaya/Ajingi/Albasu Federal Constituency. Empowering communities through education, healthcare, and infrastructure development.',
  keywords: [
    'Ghali Panda',
    'Gaya Ajingi Albasu',
    'Federal Constituency',
    'Nigeria Politics',
    'Community Development',
    'Legislative Work',
  ],
  authors: [{name: 'Hon. Dr. Ghali Mustapha Tijjani Phanda'}],
  creator: 'Hon. Dr. Ghali Campaign Team',
  publisher: 'Hon. Dr. Ghali Campaign',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://ghalipada.vercel.app',
    siteName: 'Hon. Dr. Ghali Panda',
    title: 'Hon. Dr. Ghali Mustapha Tijjani Phanda - Your Representative',
    description:
      'Empowering Gaya/Ajingi/Albasu communities through quality representation, development projects, and dedicated service. Together we build a better tomorrow.',
    images: [
      {
        url: 'https://ghalipada.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hon. Dr. Ghali Mustapha Tijjani Phanda',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hon. Dr. Ghali Panda - Your Representative',
    description:
      'Empowering communities through education, healthcare, and infrastructure development.',
    images: ['https://ghalipada.vercel.app/og-image.jpg'],
    creator: '@GhaliPanda',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#166534',
}

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})
const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  // @todo: understand why extrabold (800) isn't being respected when explicitly specified in this weight array
  // weight: ['500', '700', '800'],
})
const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable} ${serif.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <meta name="theme-color" content="#166534" />
      </head>
      <body>{children}</body>
    </html>
  )
}

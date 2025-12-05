import './globals.css'
import {IBM_Plex_Mono, Inter, PT_Serif} from 'next/font/google'
import {Metadata, Viewport} from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Hon. Suleiman Abdu Kwari - Former Senator, Kaduna North',
    template: '%s | Hon. Suleiman Kwari',
  },
  description:
    'Official website of Hon. Suleiman Abdu Kwari - Former Senator representing Kaduna North Senatorial District (2019-2023). Champion of Development, Finance Expert, and Anti-Corruption Advocate.',
  keywords: [
    'Suleiman Kwari',
    'Kaduna North',
    'Senator',
    'Nigeria Politics',
    'Community Development',
    'Finance Commissioner',
    'Legislative Work',
  ],
  authors: [{name: 'Hon. Suleiman Abdu Kwari'}],
  creator: 'Hon. Suleiman Kwari Legacy Team',
  publisher: 'Hon. Suleiman Kwari Legacy',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://suleimankwari.vercel.app',
    siteName: 'Hon. Suleiman Kwari Legacy',
    title: 'Hon. Suleiman Abdu Kwari - Legacy of Service',
    description:
      'Celebrating the impactful service of Hon. Suleiman Abdu Kwari in Kaduna North. 60+ projects delivered, 50,000+ lives impacted.',
    images: [
      {
        url: 'https://suleimankwari.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hon. Suleiman Abdu Kwari',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hon. Suleiman Kwari - Legacy of Service',
    description:
      'Championing development in Kaduna North. Former Senator and Commissioner of Finance.',
    images: ['https://suleimankwari.vercel.app/og-image.jpg'],
    creator: '@SuleimanKwari',
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
  icons: {
    icon: [
      { url: '/assets/favicon.ico' },
      { url: '/assets/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/assets/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/assets/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/assets/site.webmanifest', // Point to the manifest in assets
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
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
        <meta name="theme-color" content="#166534" />
      </head>
      <body>{children}</body>
    </html>
  )
}

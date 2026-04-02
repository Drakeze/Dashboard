import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from '@/components/navigation'
import { AppHeader } from '@/components/app-header'
import './globals.css'

export const metadata: Metadata = {
  title: 'Character Compendium',
  description: 'Explore and manage fantasy characters with detailed stats and backstories',
  generator: 'v0.app',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground pb-16 md:pb-0">
        <AppHeader />
        {children}
        <Navigation />
        <Analytics />
      </body>
    </html>
  )
}

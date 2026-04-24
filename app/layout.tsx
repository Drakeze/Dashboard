import { AppHeader } from '@/components/app-header'
import { Navigation } from '@/components/navigation'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Character Compendium',
  description: 'Explore and manage fantasy characters with detailed stats and backstories',
  generator: 'Anthonys Hard work and dedication',
  icons: {
    icon: [
      { url: '/public/Minecraft Pfp 1.png', sizes: 'any' },
    ],
  }
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

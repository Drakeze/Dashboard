import { AppHeader } from '@/components/app-header'
import { Navigation } from '@/components/navigation'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'
import { getCharacters } from '@/lib/character-data'
import type { Metadata } from 'next'
import './globals.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Character Compendium',
  description: 'Explore and manage fantasy characters with detailed stats and backstories',
  generator: 'Anthonys Hard work and dedication',
  icons: {
    icon: [
      { url: '/Minecraft Pfp 1.png', sizes: 'any' },
    ],
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const characters = await getCharacters()

  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground pb-16 md:pb-0">
        <AppHeader characters={characters} />
        {children}
        <Navigation />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

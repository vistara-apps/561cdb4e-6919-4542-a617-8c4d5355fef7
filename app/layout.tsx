import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'

export const metadata: Metadata = {
  title: 'FairGazer - Win Digital Treasures with Blockchain Fairness',
  description: 'FairGazer brings provably fair draws to digital goods. Win NFTs, gift cards, and gaming items through transparent, decentralized draws on Base.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="default">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

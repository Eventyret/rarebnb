import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rare BnB 🏡',
  description: 'Rare houses for rent',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

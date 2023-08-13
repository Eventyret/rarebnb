import ClientOnly from '@/components/ClientOnly'
import RegisterModal from '@/components/modals/RegisterModal'
import Navbar from '@/components/navbar/Navbar'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import ToasterProvider from '@/providers/ToasterPrivder'

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
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}

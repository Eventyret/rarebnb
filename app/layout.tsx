import ClientOnly from '@/components/ClientOnly'
import RegisterModal from '@/components/modals/RegisterModal'
import Navbar from '@/components/navbar/Navbar'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import ToasterProvider from '@/providers/ToasterPrivder'
import LoginModal from '@/components/modals/LoginModal'
import getCurrentUser from '../actions/getCurrentUser'
import RentModal from '@/components/modals/RentModal'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rare BnB 🏡',
  description: 'Rare houses for rent',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}

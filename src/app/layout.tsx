import Navbar from '@/components/shared/nav'
import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Kiwii',
  description: 'One place for all your agency needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar/> 
        {children}
      </body>
    </html>
  )
}

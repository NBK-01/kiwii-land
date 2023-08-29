import Navbar from '@/components/shared/nav'
import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react';



export const metadata: Metadata = {
  title: 'Kiwii - Waitlist',
  description: 'One place for all your agency needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="md:overflow-scroll overflow-hidden">
        <Navbar/> 
        {children}
        <Analytics/>
      </body>
    </html>
  )
}

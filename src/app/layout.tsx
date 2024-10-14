import Navbar from '@/components/shared/nav'
import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react';



export const metadata: Metadata = {
  title: 'Kiwii',
  description: 'Do not miss out on the big reveal! Something exciting is coming your way',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        {children}
        <Analytics/>
      </body>
    </html>
  )
}

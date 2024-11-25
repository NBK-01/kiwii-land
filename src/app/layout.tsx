import Navbar from "@/components/shared/nav";
import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Kiwii",
  description:
    "Do not miss out on the big reveal! Something exciting is coming your way",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <title>Kiwii</title>
      <meta
        name="description"
        content="Do not miss out on the big reveal! Something exciting is coming your way"
      />

      <meta property="og:url" content="https://kiwii.app" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Kiwii" />
      <meta
        property="og:description"
        content="Do not miss out on the big reveal! Something exciting is coming your way"
      />
      <meta property="og:image" content="/og-img.png" />

      <body className="">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

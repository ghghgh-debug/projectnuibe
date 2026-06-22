import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "nuibe — New & Unique Beauty",
  description: "Cheerful energy that fills your daily life. Clean, editorial Korean skincare, makeup, and inner beauty.",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#1E1613",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} bg-background`}>
      <body className="font-mono antialiased overflow-x-hidden">
        <div className="noise-overlay" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

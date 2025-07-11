import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kenan Alkabbani Real Estate - Dubai Real Estate",
  description:
    "Experience Dubai living like never before with Kenan Alkabbani Real Estate. Find your dream home in Dubai's most prestigious developments.",
  keywords:
    "Dubai real estate, luxury properties, off-plan projects, investment properties, Dubai Marina, Downtown Dubai, Palm Jumeirah",
  authors: [{ name: "Kenan Alkabbani Real Estate LLC" }],
  creator: "Kenan Alkabbani Real Estate LLC",
  publisher: "Kenan Alkabbani Real Estate LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://investmentexperts.ae"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kenan Alkabbani Real Estate - Dubai Real Estate",
    description:
      "Experience Dubai living like never before with Kenan Alkabbani Real Estate. Find your dream home in Dubai's most prestigious developments.",
    url: "https://investmentexperts.ae",
    siteName: "Kenan Alkabbani Real Estate",
    images: [
      {
        url: "/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Dubai Skyline - Kenan Alkabbani Real Estate Real Estate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenan Alkabbani Real Estate - Dubai Real Estate",
    description:
      "Experience Dubai living like never before with Kenan Alkabbani Real Estate. Find your dream home in Dubai's most prestigious developments.",
    images: ["/hero.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Suspense
                fallback={
                  <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                  </div>
                }
              >
                {children}
              </Suspense>
            </main>
            <Toaster />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

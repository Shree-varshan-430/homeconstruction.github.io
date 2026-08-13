import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import { siteConfig } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | GK Editorial`
  },
  description: siteConfig.description,
  keywords: [
    "House Construction in Bangalore",
    "Residential Construction Guide",
    "Cost to Build a House in Bangalore",
    "Home Construction Tips",
    "Building Materials Guide",
    "Interior Design Ideas",
    "Modern Bedroom Interior Design",
    "Living Room Interior Design",
    "Modular Kitchen Design",
    "Wardrobe Design Ideas",
    "Waterproofing Guide",
    "Vastu House Planning"
  ],
  authors: [{ name: "GK Home Construction Editorial" }],
  creator: "GK Home Construction Editorial",
  publisher: "GK Home Construction Editorial",
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${siteConfig.siteUrl}/feed.xml`
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: "GK Home Construction Editorial",
    images: [
      {
        url: "/homeconstruction.github.io/og/default.jpg",
        width: 1200,
        height: 630,
        alt: "GK Home Construction Editorial"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/homeconstruction.github.io/og/default.jpg"]
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="flex flex-col min-h-screen bg-bg text-primary">
        <ReadingProgress />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

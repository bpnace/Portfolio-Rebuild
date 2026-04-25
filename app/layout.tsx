import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Ccm19Loader } from "@/components/layout/Ccm19Loader";
import { Footer } from "@/components/layout/Footer";
import { HashScrollRestorer } from "@/components/layout/HashScrollRestorer";
import { Nav } from "@/components/layout/Nav";
import { Analytics } from "@/components/layout/Analytics";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const interSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const interDisplay = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Webdesign Berlin",
    "Website erstellen lassen",
    "Frontend Entwicklung",
    "Website Relaunch",
    "Technisches SEO",
  ],
  authors: [{ name: "Arthur Marshall" }],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${interSans.variable} ${interDisplay.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Ccm19Loader />
        <Analytics />
        <HashScrollRestorer />
        <div className="relative flex min-h-screen flex-col">
          <Nav />
          <div className="flex-1 pt-20 md:pt-24">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

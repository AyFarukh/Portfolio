import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./fancy.css";
import "./multilingual-greeting.css";
import "./professional.css";
import "./backend-features.css";
import "./self-learning-chat.css";
import "./portfolio-lab.css";
import "./interaction-fixes.css";
import "./design-system.css";
import "./professional-polish.css";
import "./brand-identity.css";
import "./project-gallery.css";
import "./client-success.css";
import "./mobile-navigation.css";
import "./premium-home.css";
import "./custom-cursor.css";
import SelfLearningChatbot from "./SelfLearningChatbot";
import StructuredData from "./StructuredData";
import MobileNavigation from "./MobileNavigation";
import CustomCursor from "./CustomCursor";
import { siteConfig } from "./seo-config";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#080b11",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: "%s | Farrukh Sultan" },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: "Farrukh Sultan Portfolio",
  category: "technology",
  classification: "Shopify Plus Development, Full Stack Engineering, Ecommerce Development",
  referrer: "origin-when-cross-origin",
  alternates: { canonical: "/", languages: { "en-US": "/" } },
  icons: {
    icon: [{ url: "/fs-monogram.svg", type: "image/svg+xml" }],
    shortcut: "/fs-monogram.svg",
    apple: "/fs-monogram.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Farrukh Sultan Portfolio",
    title: siteConfig.title,
    description: siteConfig.description,
    firstName: "Farrukh",
    lastName: "Sultan",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Farrukh Sultan — Senior Shopify Plus Developer and Full Stack Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  other: { "geo.region": "PK-PB", "geo.placename": "Lahore" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body>
        <StructuredData />
        <CustomCursor />
        <MobileNavigation />
        {children}
        <SelfLearningChatbot />
      </body>
    </html>
  );
}

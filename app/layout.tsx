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
import MultilingualGreeting from "./MultilingualGreeting";
import PortfolioBackendFeatures from "./PortfolioBackendFeatures";
import SelfLearningChatbot from "./SelfLearningChatbot";
import PortfolioLab from "./PortfolioLab";
import SiteExperience from "./SiteExperience";
import StructuredData from "./StructuredData";
import ProjectScreenshotGallery from "./ProjectScreenshotGallery";
import { siteConfig } from "./seo-config";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#07090d" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Farrukh Sultan",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: "Farrukh Sultan Portfolio",
  category: "technology",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/fs-monogram.svg", type: "image/svg+xml" }],
    shortcut: "/fs-monogram.svg",
    apple: "/fs-monogram.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Farrukh Sultan Portfolio",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Farrukh Sultan — Senior Shopify Plus and Full Stack Developer" }],
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
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StructuredData />
        <SiteExperience />
        <MultilingualGreeting />
        {children}
        <PortfolioLab />
        <ProjectScreenshotGallery />
        <PortfolioBackendFeatures />
        <SelfLearningChatbot />
      </body>
    </html>
  );
}

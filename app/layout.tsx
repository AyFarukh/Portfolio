import type { Metadata } from "next";
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
import MultilingualGreeting from "./MultilingualGreeting";
import PortfolioBackendFeatures from "./PortfolioBackendFeatures";
import SelfLearningChatbot from "./SelfLearningChatbot";
import PortfolioLab from "./PortfolioLab";
import SiteExperience from "./SiteExperience";

export const metadata: Metadata = {
  title: "Farrukh Sultan | Senior Shopify Plus & Full Stack Developer",
  description:
    "Senior Full Stack Developer specializing in Shopify Plus, custom apps, checkout extensions, React, Node.js, Python, AI and computer vision.",
  metadataBase: new URL("https://portfolio-farrukh.vercel.app"),
  openGraph: {
    title: "Farrukh Sultan | Senior Shopify Plus & Full Stack Developer",
    description:
      "Shopify Plus architecture, custom apps, headless commerce, AI-powered ecommerce and scalable full-stack systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteExperience />
        <MultilingualGreeting />
        {children}
        <PortfolioLab />
        <PortfolioBackendFeatures />
        <SelfLearningChatbot />
      </body>
    </html>
  );
}

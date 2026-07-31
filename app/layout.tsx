import type { Metadata } from "next";
import "./globals.css";
import "./fancy.css";
import "./multilingual-greeting.css";
import "./professional.css";
import "./backend-features.css";
import "./self-learning-chat.css";
import MultilingualGreeting from "./MultilingualGreeting";
import PortfolioBackendFeatures from "./PortfolioBackendFeatures";
import SelfLearningChatbot from "./SelfLearningChatbot";

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
    <html lang="en">
      <body>
        <MultilingualGreeting />
        {children}
        <PortfolioBackendFeatures />
        <SelfLearningChatbot />
      </body>
    </html>
  );
}

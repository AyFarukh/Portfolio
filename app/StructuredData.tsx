import { siteConfig } from "./seo-config";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        url: siteConfig.url,
        image: `${siteConfig.url}/fs-monogram.svg`,
        jobTitle: "Senior Shopify Plus Developer & Full Stack Engineer",
        description: siteConfig.description,
        email: `mailto:${siteConfig.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lahore",
          addressCountry: "PK",
        },
        sameAs: [siteConfig.linkedin, siteConfig.github],
        knowsAbout: [
          "Shopify Plus",
          "Shopify App Development",
          "Checkout UI Extensions",
          "Shopify Functions",
          "Cart Transform API",
          "Liquid",
          "Online Store 2.0",
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "NestJS",
          "GraphQL",
          "Headless Commerce",
          "PostgreSQL",
          "MongoDB",
          "Python",
          "FastAPI",
          "Artificial Intelligence",
          "Computer Vision",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: "Farrukh Sultan Portfolio",
        alternateName: "Farrukh Sultan — Shopify Plus Developer",
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profile`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        mainEntity: { "@id": `${siteConfig.url}/#person` },
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: "Farrukh Sultan Shopify Plus & Full Stack Development",
        url: siteConfig.url,
        description: "Shopify Plus development, custom Shopify apps, checkout extensions, headless commerce, performance optimization and full-stack ecommerce engineering.",
        founder: { "@id": `${siteConfig.url}/#person` },
        areaServed: "Worldwide",
        serviceType: [
          "Shopify Plus Development",
          "Custom Shopify App Development",
          "Shopify Checkout Extension Development",
          "Shopify Functions Development",
          "Headless Commerce Development",
          "Full Stack Web Development",
          "Shopify Performance Optimization",
          "AI Ecommerce Development",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

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
        jobTitle: "Senior Shopify Plus & Full Stack Developer",
        email: `mailto:${siteConfig.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lahore",
          addressCountry: "PK",
        },
        sameAs: [siteConfig.linkedin, siteConfig.github],
        knowsAbout: [
          "Shopify Plus",
          "Shopify Apps",
          "Checkout UI Extensions",
          "Cart Transform API",
          "React",
          "Next.js",
          "Node.js",
          "GraphQL",
          "Headless Commerce",
          "PostgreSQL",
          "Python",
          "Computer Vision",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#person` },
        inLanguage: "en",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: "Farrukh Sultan Development Services",
        url: siteConfig.url,
        founder: { "@id": `${siteConfig.url}/#person` },
        areaServed: "Worldwide",
        serviceType: [
          "Shopify Plus Development",
          "Custom Shopify App Development",
          "Headless Commerce Development",
          "Full Stack Web Development",
          "Shopify Performance Optimization",
          "AI and Automation Development",
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

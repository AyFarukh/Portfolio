export type KnowledgeEntry = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
  category: string;
  suggestions?: string[];
  projects?: Array<{ name: string; url?: string; reason: string }>;
};

export const defaultKnowledge: KnowledgeEntry[] = [
  {
    id: "about-farrukh",
    title: "About Farrukh Sultan",
    category: "profile",
    keywords: ["who are you", "about farrukh", "tell me about yourself", "experience", "background", "senior developer"],
    answer: "Farrukh Sultan is a Senior Shopify Plus and Full Stack Engineer with 8+ years of experience building ecommerce storefronts, custom apps, checkout systems, SaaS platforms and AI-powered product experiences for international clients.",
    suggestions: ["Show me Shopify projects", "What technologies does he use?", "Is he available?"],
  },
  {
    id: "shopify-services",
    title: "Shopify services",
    category: "shopify",
    keywords: ["shopify", "shopify plus", "store", "theme", "liquid", "checkout extension", "cart transform", "bundle", "migration", "redesign"],
    answer: "Farrukh builds Shopify Plus stores, custom themes, private and public apps, checkout extensions, Cart Transform bundle systems, migrations, performance improvements and long-term feature development.",
    suggestions: ["Do you build custom apps?", "Can you improve store speed?", "Show Shopify case studies"],
    projects: [
      { name: "Maniac Nails", url: "https://maniac-nails.com", reason: "Custom bundles, checkout logic and Shopify Plus architecture" },
      { name: "Free The Roots", url: "https://freetheroots.com", reason: "Custom storefront and bundle workflows" },
    ],
  },
  {
    id: "custom-apps",
    title: "Custom Shopify apps",
    category: "shopify",
    keywords: ["custom app", "private app", "shopify app", "admin api", "storefront api", "webhook", "graphql", "app proxy", "extension"],
    answer: "Yes. Farrukh develops custom Shopify apps using Node.js, React, GraphQL, Admin API, Storefront API, webhooks, app proxies, Shopify Functions and theme app extensions.",
    suggestions: ["Can you build a bundle app?", "Do you build checkout extensions?", "What does a custom app cost?"],
    projects: [{ name: "MimiBeds Bundle System", reason: "High-variant bundles, discounts, preorder logic and app proxy architecture" }],
  },
  {
    id: "subscriptions",
    title: "Subscriptions and memberships",
    category: "shopify",
    keywords: ["subscription", "recharge", "loop", "membership", "recurring", "selling plan"],
    answer: "Farrukh works with Shopify subscription architecture, Recharge, Loop, selling plans, subscriber-specific storefront logic and recurring-purchase integrations.",
    suggestions: ["Recharge integration", "Membership access", "Subscription migration"],
  },
  {
    id: "bundles",
    title: "Bundle systems",
    category: "shopify",
    keywords: ["bundle", "kit", "mix and match", "cart transform", "discount tier", "volume discount", "bundle builder"],
    answer: "Farrukh builds advanced bundle systems with tiered discounts, Cart Transform API, custom app logic, inventory validation, preorder rules and dynamic product selection.",
    projects: [
      { name: "Maniac Nails", url: "https://maniac-nails.com", reason: "Custom starter-set bundle experience" },
      { name: "MimiBeds Bundle System", reason: "Complex bundle architecture with database-backed configuration" },
    ],
    suggestions: ["How are discounts handled?", "Can bundles support subscriptions?", "Discuss a bundle project"],
  },
  {
    id: "headless-commerce",
    title: "Headless commerce",
    category: "commerce",
    keywords: ["headless", "hydrogen", "oxygen", "remix", "next.js storefront", "storefront api", "headless shopify"],
    answer: "Farrukh works on headless commerce using React, Next.js, Remix, Hydrogen, Oxygen and Shopify Storefront API with GraphQL. He can help decide whether headless is justified for your business rather than recommending it by default.",
    suggestions: ["Should I use headless?", "Hydrogen vs Next.js", "Discuss architecture"],
  },
  {
    id: "full-stack",
    title: "Full-stack development",
    category: "engineering",
    keywords: ["react", "next", "node", "nestjs", "python", "fastapi", "postgresql", "mongodb", "full stack", "backend", "api", "saas"],
    answer: "Farrukh builds full-stack applications with React, Next.js, Node.js, NestJS, Python, FastAPI, PostgreSQL, MongoDB, Redis, REST, GraphQL and Docker.",
    suggestions: ["Do you build SaaS products?", "Can you build an API?", "What backend stack do you recommend?"],
  },
  {
    id: "ai-automation",
    title: "AI and automation services",
    category: "ai",
    keywords: ["ai", "automation", "computer vision", "yolo", "opencv", "chatbot", "machine learning", "workflow"],
    answer: "Farrukh builds AI-enabled product experiences, workflow automation, computer vision pipelines, YOLO/OpenCV integrations and custom knowledge-based assistants without requiring a third-party AI API when accuracy and control matter more.",
    projects: [{ name: "AI Wheel Visualizer", reason: "Vehicle wheel detection and realistic product visualization" }],
    suggestions: ["Tell me about the wheel visualizer", "Can you build a custom chatbot?", "Can AI connect to Shopify?"],
  },
  {
    id: "performance-cro",
    title: "Performance and conversion optimization",
    category: "optimization",
    keywords: ["speed", "slow", "performance", "core web vitals", "lighthouse", "conversion", "cro", "optimize", "page speed"],
    answer: "Farrukh improves Shopify performance and conversion by auditing theme code, JavaScript, third-party apps, images, collection architecture, product-page UX, analytics and checkout friction. Recommendations are prioritized by business impact.",
    suggestions: ["Audit my store", "Improve Core Web Vitals", "Optimize product page"],
  },
  {
    id: "product-configurator",
    title: "Product configurators",
    category: "commerce",
    keywords: ["configurator", "customizer", "personalization", "product builder", "3d product", "options", "custom product"],
    answer: "Farrukh builds custom product configurators with dynamic options, real-time pricing, metafields, variant logic, image or 3D previews and cart validation.",
    projects: [{ name: "Laudi Vidni", url: "https://laudividni.com", reason: "Luxury product personalization experience" }],
    suggestions: ["Can it show a live preview?", "Can it handle many variants?", "View Laudi Vidni"],
  },
  {
    id: "integrations",
    title: "Commerce integrations",
    category: "engineering",
    keywords: ["integration", "erp", "3pl", "klaviyo", "recharge", "rebuy", "shipstation", "api integration", "crm", "webhook"],
    answer: "Farrukh integrates Shopify with ERP, 3PL, subscriptions, email platforms, search tools, analytics, CRMs and custom APIs using secure webhooks, GraphQL and REST services.",
    suggestions: ["ERP integration", "Subscription integration", "Custom API integration"],
  },
  {
    id: "pricing",
    title: "Pricing",
    category: "sales",
    keywords: ["price", "pricing", "cost", "budget", "rate", "how much", "quote", "hourly"],
    answer: "Pricing depends on scope, integrations, timeline, risk and ownership requirements. Small focused work can be estimated quickly, while full Shopify Plus builds and custom applications need discovery. Share your budget and project details in the contact form for a tailored estimate.",
    suggestions: ["What information is needed for a quote?", "Do you offer retainers?", "Start a project inquiry"],
  },
  {
    id: "availability",
    title: "Availability",
    category: "sales",
    keywords: ["available", "availability", "start", "hire", "contract", "full time", "remote", "timezone", "canadian hours", "us hours"],
    answer: "Farrukh is open to remote contract, permanent and project-based opportunities and can work overlapping North American hours. Use the contact form with your preferred start date for direct confirmation.",
    suggestions: ["Can I hire Farrukh?", "Schedule a discussion", "Send project details"],
  },
  {
    id: "projects",
    title: "Selected projects",
    category: "portfolio",
    keywords: ["project", "portfolio", "case study", "work", "examples", "maniac nails", "free the roots", "laudi vidni", "starfire", "wheel visualizer", "agni wheels", "ginger blue decor"],
    answer: "Featured work includes Maniac Nails, Free The Roots, Laudi Vidni, Starfire Direct, Agni Wheels, MimiBeds bundle architecture and an AI-powered wheel visualizer. The project archive also includes dozens of Shopify builds and customizations across fashion, health, lifestyle and B2B commerce.",
    suggestions: ["Tell me about Maniac Nails", "Show bundle projects", "Show AI projects"],
  },
  {
    id: "maniac-nails",
    title: "Maniac Nails case study",
    category: "portfolio",
    keywords: ["maniac nails", "maniac-nails", "nail project", "starter set"],
    answer: "Maniac Nails is a Shopify Plus project featuring custom storefront architecture, bundle logic, checkout extensions, Cart Transform API work, private app features and inventory-aware workflows.",
    projects: [{ name: "Maniac Nails", url: "https://maniac-nails.com", reason: "Live storefront" }],
    suggestions: ["How were bundles built?", "What technology was used?", "Discuss a similar project"],
  },
  {
    id: "free-the-roots",
    title: "Free The Roots case study",
    category: "portfolio",
    keywords: ["free the roots", "freetheroots", "hair care project"],
    answer: "Free The Roots involved Shopify theme modernization, bundle architecture, cart experience improvements, app cleanup, mobile UX work and performance-focused storefront development.",
    projects: [{ name: "Free The Roots", url: "https://freetheroots.com", reason: "Live storefront" }],
    suggestions: ["What bundle work was done?", "Was performance improved?", "Discuss a similar store"],
  },
  {
    id: "laudi-vidni",
    title: "Laudi Vidni case study",
    category: "portfolio",
    keywords: ["laudi vidni", "laudividni", "bag configurator", "luxury configurator"],
    answer: "Laudi Vidni showcases a luxury ecommerce product configurator where shoppers personalize materials, lining, hardware and straps through a custom Shopify experience.",
    projects: [{ name: "Laudi Vidni", url: "https://laudividni.com", reason: "Live configurator" }],
    suggestions: ["How does the configurator work?", "Can you build one for my store?", "View live project"],
  },
  {
    id: "wheel-visualizer",
    title: "AI Wheel Visualizer",
    category: "portfolio",
    keywords: ["wheel visualizer", "rim visualizer", "agni wheels", "computer vision project", "vehicle photo"],
    answer: "The AI Wheel Visualizer uses a Next.js frontend, FastAPI backend, local YOLO detection, OpenCV image processing and GPU workers to detect wheels in vehicle photos and preview selected rims.",
    suggestions: ["What is the architecture?", "Can it integrate with Shopify?", "Build a similar visualizer"],
  },
  {
    id: "resume-skills",
    title: "Resume and technical skills",
    category: "profile",
    keywords: ["resume", "cv", "skills", "technology", "tech stack", "certification", "experience years"],
    answer: "Farrukh’s core stack includes Shopify Plus, Liquid, React, Next.js, Remix, Node.js, NestJS, Python, FastAPI, GraphQL, PostgreSQL, MongoDB, Redis, Docker, headless commerce, checkout extensions and computer vision.",
    suggestions: ["Download resume", "Shopify expertise", "Full-stack expertise"],
  },
  {
    id: "contact",
    title: "Contact Farrukh",
    category: "sales",
    keywords: ["contact", "email", "talk", "meeting", "call", "message", "reach", "zoom", "hire"],
    answer: "Use the project inquiry form on this page or email farukh.5937@gmail.com. Include your goals, current platform, timeline and budget range so Farrukh can respond with useful next steps.",
    suggestions: ["Open the contact form", "What details should I include?", "Is Farrukh available?"],
  },
];

const stopWords = new Set(["a", "an", "the", "is", "are", "do", "does", "can", "could", "you", "your", "i", "we", "to", "for", "of", "and", "or", "in", "on", "with", "about", "please", "tell", "me"]);

export function normalizeText(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}

function tokens(value: string) {
  return normalizeText(value).split(" ").filter((token) => token.length > 1 && !stopWords.has(token));
}

export function scoreKnowledge(message: string, entry: KnowledgeEntry) {
  const normalized = normalizeText(message);
  const messageTokens = new Set(tokens(message));
  let score = 0;
  for (const keyword of entry.keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (!normalizedKeyword) continue;
    if (normalized === normalizedKeyword) score += 10;
    else if (normalized.includes(normalizedKeyword)) score += normalizedKeyword.includes(" ") ? 6 : 4;
    for (const token of tokens(normalizedKeyword)) {
      if (messageTokens.has(token)) score += 1.5;
      else if ([...messageTokens].some((value) => value.startsWith(token) || token.startsWith(value))) score += 0.5;
    }
  }
  for (const token of tokens(entry.title)) if (messageTokens.has(token)) score += 1;
  return score;
}

export function findBestKnowledge(message: string, entries: KnowledgeEntry[]) {
  const ranked = entries.map((entry) => ({ entry, score: scoreKnowledge(message, entry) })).sort((a, b) => b.score - a.score);
  const best = ranked[0];
  const second = ranked[1];
  if (!best) return { match: null, score: 0, confidence: 0, alternatives: [] as KnowledgeEntry[] };
  const confidence = Math.min(1, best.score / 9) * (second ? Math.min(1, Math.max(0.45, best.score / Math.max(second.score * 1.4, 1))) : 1);
  return { match: best.entry, score: best.score, confidence, alternatives: ranked.slice(1, 4).filter((item) => item.score >= 2).map((item) => item.entry) };
}

export type KnowledgeEntry = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
  category: string;
};

export const defaultKnowledge: KnowledgeEntry[] = [
  {
    id: "shopify-services",
    title: "Shopify services",
    category: "shopify",
    keywords: ["shopify", "shopify plus", "store", "theme", "liquid", "checkout extension", "cart transform", "bundle", "migration"],
    answer: "Farrukh builds Shopify Plus stores, custom themes, private and public apps, checkout extensions, Cart Transform bundle systems, migrations, performance improvements and long-term feature development.",
  },
  {
    id: "custom-apps",
    title: "Custom Shopify apps",
    category: "shopify",
    keywords: ["custom app", "private app", "shopify app", "admin api", "storefront api", "webhook", "graphql"],
    answer: "Yes. Farrukh develops custom Shopify apps using Node.js, React, GraphQL, Admin API, Storefront API, webhooks, app proxies and theme app extensions.",
  },
  {
    id: "headless-commerce",
    title: "Headless commerce",
    category: "commerce",
    keywords: ["headless", "hydrogen", "oxygen", "remix", "next.js storefront", "storefront api"],
    answer: "Farrukh works on headless commerce using React, Next.js, Remix, Hydrogen, Oxygen and Shopify Storefront API with GraphQL.",
  },
  {
    id: "full-stack",
    title: "Full-stack development",
    category: "engineering",
    keywords: ["react", "next", "node", "nestjs", "python", "fastapi", "postgresql", "mongodb", "full stack", "backend"],
    answer: "Farrukh builds full-stack applications with React, Next.js, Node.js, NestJS, Python, FastAPI, PostgreSQL, MongoDB, Redis, REST and GraphQL.",
  },
  {
    id: "ai-automation",
    title: "AI and automation services",
    category: "ai",
    keywords: ["ai", "automation", "computer vision", "yolo", "opencv", "chatbot", "machine learning"],
    answer: "Farrukh builds AI-enabled product experiences, workflow automation, computer vision pipelines, YOLO/OpenCV integrations and custom knowledge-based chat systems.",
  },
  {
    id: "pricing",
    title: "Pricing",
    category: "sales",
    keywords: ["price", "pricing", "cost", "budget", "rate", "how much", "quote"],
    answer: "Pricing depends on scope, integrations, timeline and ownership requirements. Share your budget and project details in the contact form for a tailored estimate.",
  },
  {
    id: "availability",
    title: "Availability",
    category: "sales",
    keywords: ["available", "availability", "start", "hire", "contract", "full time", "remote"],
    answer: "Farrukh is open to remote contract, permanent and project-based opportunities. Use the contact form with your preferred start date for direct confirmation.",
  },
  {
    id: "projects",
    title: "Selected projects",
    category: "portfolio",
    keywords: ["project", "portfolio", "case study", "maniac nails", "free the roots", "laudi vidni", "starfire", "wheel visualizer"],
    answer: "Featured work includes Maniac Nails, Free The Roots, Laudi Vidni, Starfire Direct and an AI-powered wheel visualizer. Each combines ecommerce engineering, custom features and conversion-focused UX.",
  },
  {
    id: "contact",
    title: "Contact Farrukh",
    category: "sales",
    keywords: ["contact", "email", "talk", "meeting", "call", "message", "reach"],
    answer: "Use the project inquiry form on this page or email farukh.5937@gmail.com. Include your goals, current platform, timeline and budget range.",
  },
];

const stopWords = new Set(["a", "an", "the", "is", "are", "do", "does", "can", "could", "you", "your", "i", "we", "to", "for", "of", "and", "or", "in", "on", "with", "about", "please", "tell", "me"]);

export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
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
    if (normalized.includes(normalizedKeyword)) score += normalizedKeyword.includes(" ") ? 6 : 4;
    for (const token of tokens(normalizedKeyword)) {
      if (messageTokens.has(token)) score += 1.5;
      else if ([...messageTokens].some((value) => value.startsWith(token) || token.startsWith(value))) score += 0.5;
    }
  }

  const titleTokens = tokens(entry.title);
  for (const token of titleTokens) if (messageTokens.has(token)) score += 1;
  return score;
}

export function findBestKnowledge(message: string, entries: KnowledgeEntry[]) {
  const ranked = entries
    .map((entry) => ({ entry, score: scoreKnowledge(message, entry) }))
    .sort((a, b) => b.score - a.score);
  const best = ranked[0];
  const second = ranked[1];
  if (!best) return { match: null, score: 0, confidence: 0 };
  const confidence = Math.min(1, best.score / 9) * (second ? Math.min(1, Math.max(0.45, best.score / Math.max(second.score * 1.4, 1))) : 1);
  return { match: best.entry, score: best.score, confidence };
}

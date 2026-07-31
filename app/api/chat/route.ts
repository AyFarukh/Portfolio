import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const serviceContext = `
You are the portfolio assistant for Farrukh Sultan, a Senior Full Stack Developer with 8+ years of experience.
His core services are:
- Shopify Plus architecture, theme development, migrations and performance optimization
- Custom Shopify apps, Admin API, Storefront API, GraphQL, webhooks and checkout extensions
- React, Next.js, Node.js, NestJS, Python, FastAPI and PostgreSQL systems
- Headless commerce using Hydrogen, Oxygen, Remix and modern storefront architecture
- AI product experiences, OpenAI integrations, automation, computer vision, YOLO and OpenCV
- Conversion optimization, bundle systems, product configurators and complex ecommerce workflows

Selected work includes Maniac Nails, Free The Roots, Laudi Vidni, Starfire Direct and an AI Wheel Visualizer.
Farrukh works remotely and can discuss project-based, contract and senior engineering opportunities.
Never invent prices, availability promises, client confidential details or project results not stated here.
Keep answers concise and practical. Encourage qualified visitors to submit the contact form.
`;

function fallbackReply(message: string) {
  const text = message.toLowerCase();
  if (text.includes("shopify") || text.includes("store")) return "Farrukh can help with Shopify Plus builds, theme architecture, custom apps, checkout extensions, migrations, bundles, performance and ongoing development. Tell me what store or feature you are planning.";
  if (text.includes("ai") || text.includes("chatbot") || text.includes("automation")) return "AI services include OpenAI integrations, workflow automation, computer vision, YOLO/OpenCV pipelines and AI-powered ecommerce experiences. A short project description will help identify the right architecture.";
  if (text.includes("price") || text.includes("cost") || text.includes("budget")) return "Pricing depends on scope, integrations, timeline and ownership requirements. Use the project form with your budget range and Farrukh will respond with the most suitable engagement approach.";
  if (text.includes("time") || text.includes("available") || text.includes("start")) return "Availability depends on the project size and current delivery schedule. Submit your preferred timeline in the contact form for a direct confirmation.";
  if (text.includes("react") || text.includes("next") || text.includes("node") || text.includes("python")) return "Farrukh builds full-stack products with React, Next.js, Node.js, NestJS, Python, FastAPI, GraphQL and PostgreSQL, including commerce platforms and AI-enabled applications.";
  return "I can explain Farrukh’s Shopify Plus, full-stack, headless commerce and AI services. What type of project are you considering?";
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { message?: unknown; history?: unknown };
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 1200) : "";
    if (!message) return NextResponse.json({ error: "Please enter a message." }, { status: 400 });

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ reply: fallbackReply(message), mode: "service-guide" });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const history = Array.isArray(body.history)
      ? body.history.slice(-8).flatMap((item) => {
          if (!item || typeof item !== "object") return [];
          const role = (item as { role?: unknown }).role;
          const content = (item as { content?: unknown }).content;
          if ((role !== "user" && role !== "assistant") || typeof content !== "string") return [];
          return [{ role, content: content.slice(0, 1200) } as const];
        })
      : [];

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.35,
      max_tokens: 240,
      messages: [
        { role: "system", content: serviceContext },
        ...history,
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0]?.message?.content || fallbackReply(message),
      mode: "ai",
    });
  } catch (error) {
    console.error("Chat request failed", error);
    return NextResponse.json({ reply: "I’m having trouble connecting right now. Please use the project form and Farrukh will reply directly.", mode: "fallback" });
  }
}

import { NextResponse } from "next/server";
import { defaultKnowledge, findBestKnowledge, normalizeText } from "@/lib/chatbot-knowledge";
import { getApprovedKnowledge, recordChatQuestion } from "@/lib/db";

export const runtime = "nodejs";

const MATCH_THRESHOLD = 3.5;
const CONFIDENCE_THRESHOLD = 0.42;

function smartFallback(message: string) {
  const text = normalizeText(message);
  if (/help|need|problem|issue|build|project/.test(text)) {
    return {
      reply: "Absolutely. To point you in the right direction, which area best matches your need?",
      suggestions: ["Shopify store or app", "Website speed or conversions", "Full-stack application", "AI or automation"],
    };
  }
  if (/slow|speed|performance/.test(text)) {
    return {
      reply: "That sounds like a performance issue. Share the store URL, theme name and the apps currently installed. Farrukh can then identify whether the main bottleneck is theme code, third-party scripts, images or storefront architecture.",
      suggestions: ["Improve Core Web Vitals", "Audit my Shopify store", "Open the contact form"],
    };
  }
  if (/subscription|membership|recurring/.test(text)) {
    return {
      reply: "Are you planning Recharge, Loop, Shopify selling plans, a recurring membership, or a migration from an existing subscription setup?",
      suggestions: ["Recharge integration", "Loop subscriptions", "Custom membership system"],
    };
  }
  return {
    reply: "That’s a useful question. I don’t have enough verified information to answer it accurately yet, so I’ve saved it for Farrukh to review. You can narrow it down using one of these topics or send the details through the project form.",
    suggestions: ["Shopify services", "Full-stack development", "AI solutions", "Contact Farrukh"],
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { message?: unknown; sessionId?: unknown; context?: unknown };
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 1200) : "";
    const sessionId = typeof body.sessionId === "string" ? body.sessionId.slice(0, 120) : null;
    if (!message) return NextResponse.json({ error: "Please enter a message." }, { status: 400 });

    const learnedKnowledge = await getApprovedKnowledge();
    const knowledge = [...learnedKnowledge, ...defaultKnowledge.filter((entry) => !learnedKnowledge.some((item) => item.id === entry.id))];
    const result = findBestKnowledge(message, knowledge);
    const answered = Boolean(result.match && result.score >= MATCH_THRESHOLD && result.confidence >= CONFIDENCE_THRESHOLD);

    const questionId = await recordChatQuestion({
      question: message,
      normalizedQuestion: normalizeText(message),
      matchedSlug: answered ? result.match?.id : null,
      confidence: result.confidence,
      status: answered ? "answered" : "unanswered",
      sessionId,
    });

    if (!answered || !result.match) {
      const fallback = smartFallback(message);
      return NextResponse.json({
        ...fallback,
        mode: "learning",
        questionId,
        confidence: result.confidence,
        needsReview: true,
        alternatives: result.alternatives.map((entry) => entry.title),
      });
    }

    return NextResponse.json({
      reply: result.match.answer,
      mode: learnedKnowledge.some((item) => item.id === result.match?.id) ? "learned" : "built-in",
      questionId,
      confidence: result.confidence,
      needsReview: false,
      category: result.match.category,
      suggestions: result.match.suggestions || ["Show relevant projects", "Discuss a project", "Contact Farrukh"],
      projects: result.match.projects || [],
    });
  } catch (error) {
    console.error("Chat request failed", error);
    return NextResponse.json({
      reply: "The assistant is temporarily unavailable. Please use the project form and Farrukh will respond directly.",
      suggestions: ["Open the contact form"],
      mode: "error",
    });
  }
}

import { NextResponse } from "next/server";
import { defaultKnowledge, findBestKnowledge, normalizeText } from "@/lib/chatbot-knowledge";
import { getApprovedKnowledge, recordChatQuestion } from "@/lib/db";

export const runtime = "nodejs";

const MATCH_THRESHOLD = 3.5;
const CONFIDENCE_THRESHOLD = 0.42;

function fallbackReply() {
  return "I don’t have an approved answer for that yet. I’ve saved your question for Farrukh to review, so the assistant can answer similar questions correctly in the future. You can also use the project form for a direct response.";
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { message?: unknown; sessionId?: unknown };
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 1200) : "";
    const sessionId = typeof body.sessionId === "string" ? body.sessionId.slice(0, 120) : null;

    if (!message) {
      return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
    }

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
      return NextResponse.json({
        reply: fallbackReply(),
        mode: "learning",
        questionId,
        confidence: result.confidence,
        needsReview: true,
      });
    }

    return NextResponse.json({
      reply: result.match.answer,
      mode: learnedKnowledge.some((item) => item.id === result.match?.id) ? "learned" : "built-in",
      questionId,
      confidence: result.confidence,
      needsReview: false,
      category: result.match.category,
    });
  } catch (error) {
    console.error("Chat request failed", error);
    return NextResponse.json({
      reply: "The assistant is temporarily unavailable. Please use the project form and Farrukh will respond directly.",
      mode: "error",
    });
  }
}

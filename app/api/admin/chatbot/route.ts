import { NextResponse } from "next/server";
import { approveQuestion, listPendingQuestions, rejectQuestion } from "@/lib/db";

export const runtime = "nodejs";

function authorized(request: Request) {
  const expected = process.env.CHATBOT_ADMIN_TOKEN;
  if (!expected) return false;
  const provided = request.headers.get("x-admin-token");
  return provided === expected;
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const questions = await listPendingQuestions();
    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Unable to load chatbot questions", error);
    return NextResponse.json({ error: "Unable to load questions." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json() as {
      action?: unknown;
      questionId?: unknown;
      title?: unknown;
      category?: unknown;
      keywords?: unknown;
      answer?: unknown;
    };

    const questionId = typeof body.questionId === "string" ? body.questionId : "";
    if (!questionId) return NextResponse.json({ error: "Question id is required." }, { status: 400 });

    if (body.action === "reject") {
      await rejectQuestion(questionId);
      return NextResponse.json({ ok: true });
    }

    if (body.action !== "approve") {
      return NextResponse.json({ error: "Invalid action." }, { status: 400 });
    }

    const title = typeof body.title === "string" ? body.title.trim().slice(0, 220) : "";
    const category = typeof body.category === "string" ? body.category.trim().slice(0, 100) : "general";
    const answer = typeof body.answer === "string" ? body.answer.trim().slice(0, 3000) : "";
    const keywords = Array.isArray(body.keywords)
      ? body.keywords.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean).slice(0, 30)
      : [];

    if (!title || !answer || keywords.length === 0) {
      return NextResponse.json({ error: "Title, answer and at least one keyword are required." }, { status: 400 });
    }

    const slug = await approveQuestion({ questionId, title, category, keywords, answer });
    return NextResponse.json({ ok: true, slug });
  } catch (error) {
    console.error("Unable to review chatbot question", error);
    return NextResponse.json({ error: "Unable to review question." }, { status: 500 });
  }
}

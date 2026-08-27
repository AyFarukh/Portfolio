import { NextResponse } from "next/server";
import { saveChatFeedback } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { questionId?: unknown; helpful?: unknown; comment?: unknown };
    if (typeof body.helpful !== "boolean") {
      return NextResponse.json({ error: "Helpful must be true or false." }, { status: 400 });
    }

    await saveChatFeedback({
      questionId: typeof body.questionId === "string" ? body.questionId : null,
      helpful: body.helpful,
      comment: typeof body.comment === "string" ? body.comment.trim().slice(0, 500) : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to save chatbot feedback", error);
    return NextResponse.json({ error: "Unable to save feedback." }, { status: 500 });
  }
}

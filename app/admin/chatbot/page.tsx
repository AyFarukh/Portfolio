"use client";

import { useEffect, useState } from "react";

type Question = {
  id: string;
  question: string;
  normalized_question: string;
  confidence: string;
  created_at: string;
};

export default function ChatbotAdminPage() {
  const [token, setToken] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/chatbot", { headers: { "x-admin-token": token } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load questions.");
      setQuestions(data.questions || []);
      sessionStorage.setItem("chatbot-admin-token", token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load questions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const stored = sessionStorage.getItem("chatbot-admin-token");
    if (stored) setToken(stored);
  }, []);

  async function review(question: Question, action: "approve" | "reject", form?: HTMLFormElement) {
    const formData = form ? new FormData(form) : null;
    const response = await fetch("/api/admin/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({
        action,
        questionId: String(question.id),
        title: formData?.get("title"),
        category: formData?.get("category"),
        keywords: String(formData?.get("keywords") || "").split(",").map((item) => item.trim()).filter(Boolean),
        answer: formData?.get("answer"),
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Unable to save review.");
      return;
    }
    setQuestions((items) => items.filter((item) => item.id !== question.id));
  }

  return (
    <main style={{ minHeight: "100vh", background: "#08090b", color: "#f5f7fb", padding: "40px 20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ width: "min(1100px, 100%)", margin: "0 auto" }}>
        <p style={{ color: "#8da2ff", letterSpacing: ".15em", textTransform: "uppercase", fontSize: 12 }}>Private admin</p>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", margin: "10px 0" }}>Chatbot learning review</h1>
        <p style={{ color: "#aeb5c2", maxWidth: 720 }}>Approve accurate answers before they become part of the live knowledge base. Rejected questions are never used.</p>

        <div style={{ display: "flex", gap: 10, margin: "30px 0 45px", flexWrap: "wrap" }}>
          <input value={token} onChange={(event) => setToken(event.target.value)} type="password" placeholder="CHATBOT_ADMIN_TOKEN" style={{ flex: "1 1 320px", padding: 14, borderRadius: 12, border: "1px solid #2b2f38", background: "#111318", color: "white" }} />
          <button onClick={load} disabled={loading || !token} style={{ padding: "14px 20px", borderRadius: 12, border: 0, fontWeight: 700 }}>{loading ? "Loading…" : "Load questions"}</button>
        </div>

        {error && <p style={{ color: "#ff8d8d" }}>{error}</p>}
        {!loading && token && questions.length === 0 && <p style={{ color: "#8f97a5" }}>No pending questions.</p>}

        <div style={{ display: "grid", gap: 18 }}>
          {questions.map((question) => (
            <form key={question.id} onSubmit={(event) => { event.preventDefault(); void review(question, "approve", event.currentTarget); }} style={{ border: "1px solid #2a2e37", borderRadius: 22, padding: 24, background: "linear-gradient(145deg,#11141a,#0c0e12)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "start" }}>
                <div><small style={{ color: "#7d8798" }}>Question #{question.id}</small><h2 style={{ margin: "8px 0 18px" }}>{question.question}</h2></div>
                <small style={{ color: "#7d8798" }}>Confidence {Math.round(Number(question.confidence) * 100)}%</small>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
                <input name="title" required placeholder="Knowledge title" defaultValue={question.question.slice(0, 80)} style={fieldStyle} />
                <input name="category" required placeholder="Category" defaultValue="general" style={fieldStyle} />
              </div>
              <input name="keywords" required placeholder="keywords, comma, separated" defaultValue={question.normalized_question.split(" ").slice(0, 8).join(", ")} style={{ ...fieldStyle, width: "100%", marginTop: 12 }} />
              <textarea name="answer" required minLength={10} placeholder="Write the approved answer" style={{ ...fieldStyle, width: "100%", minHeight: 130, marginTop: 12, resize: "vertical" }} />
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button type="submit" style={{ padding: "12px 18px", borderRadius: 12, border: 0, fontWeight: 700 }}>Approve and teach</button>
                <button type="button" onClick={() => void review(question, "reject")} style={{ padding: "12px 18px", borderRadius: 12, border: "1px solid #3a3f49", background: "transparent", color: "#ddd" }}>Reject</button>
              </div>
            </form>
          ))}
        </div>
      </div>
    </main>
  );
}

const fieldStyle = {
  padding: 13,
  borderRadius: 12,
  border: "1px solid #2b2f38",
  background: "#0b0d11",
  color: "white",
  font: "inherit",
};

"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, ExternalLink, MessageCircle, Send, ThumbsDown, ThumbsUp, X } from "lucide-react";

type Project = { name: string; url?: string; reason: string };
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  questionId?: string | null;
  suggestions?: string[];
  projects?: Project[];
  feedbackSent?: boolean;
};

function getSessionId() {
  if (typeof window === "undefined") return "";
  const key = "farrukh-chat-session";
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const created = crypto.randomUUID();
  sessionStorage.setItem(key, created);
  return created;
}

export default function SelfLearningChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi — I’m Farrukh’s portfolio assistant. I can explain services, recommend relevant projects and help you prepare a useful project inquiry.",
      suggestions: ["Shopify services", "Show featured projects", "AI and automation", "Is Farrukh available?"],
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  async function send(text = input) {
    const clean = text.trim();
    if (!clean || loading) return;
    setMessages((current) => [...current, { role: "user", content: clean }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean, sessionId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to reach the assistant.");
      setMessages((current) => [...current, {
        role: "assistant",
        content: data.reply,
        questionId: data.questionId || null,
        suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
        projects: Array.isArray(data.projects) ? data.projects : [],
      }]);
    } catch {
      setMessages((current) => [...current, {
        role: "assistant",
        content: "I’m unable to connect right now. Please use the project form and Farrukh will respond directly.",
        suggestions: ["Open the contact form"],
      }]);
    } finally {
      setLoading(false);
    }
  }

  async function feedback(index: number, helpful: boolean) {
    const message = messages[index];
    if (!message.questionId || message.feedbackSent) return;
    setMessages((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, feedbackSent: true } : item));
    await fetch("/api/chat/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: message.questionId, helpful }),
    }).catch(() => undefined);
  }

  function contactFromProject(project: Project) {
    window.dispatchEvent(new CustomEvent("portfolio-project-interest", { detail: project.name }));
    setOpen(false);
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleSuggestion(suggestion: string) {
    if (suggestion.toLowerCase().includes("contact form") || suggestion.toLowerCase().includes("project inquiry")) {
      setOpen(false);
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    void send(suggestion);
  }

  return (
    <div className={`learning-chat ${open ? "open" : ""}`}>
      {open && (
        <section className="learning-chat-panel" aria-label="Portfolio assistant">
          <header>
            <div className="learning-chat-identity"><span><Bot size={19} /></span><div><strong>Portfolio Assistant</strong><small>Verified knowledge · improves with feedback</small></div></div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant"><X size={18} /></button>
          </header>

          <div className="learning-chat-body">
            {messages.map((message, index) => (
              <div key={index} className={`learning-message-wrap ${message.role}`}>
                <div className={`learning-message ${message.role}`}>{message.content}</div>

                {message.projects && message.projects.length > 0 && (
                  <div className="learning-projects">
                    {message.projects.map((project) => (
                      <article key={project.name}>
                        <div><strong>{project.name}</strong><span>{project.reason}</span></div>
                        <div>
                          {project.url && <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}><ExternalLink size={15} /></a>}
                          <button onClick={() => contactFromProject(project)}>Discuss</button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="learning-suggestions">
                    {message.suggestions.map((suggestion) => <button key={suggestion} onClick={() => handleSuggestion(suggestion)}>{suggestion}</button>)}
                  </div>
                )}

                {message.role === "assistant" && message.questionId && (
                  <div className="learning-feedback">
                    <span>{message.feedbackSent ? "Thanks — feedback saved" : "Was this useful?"}</span>
                    {!message.feedbackSent && <><button onClick={() => feedback(index, true)} aria-label="Helpful"><ThumbsUp size={14} /></button><button onClick={() => feedback(index, false)} aria-label="Not helpful"><ThumbsDown size={14} /></button></>}
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="learning-message assistant learning-typing"><i/><i/><i/></div>}
            <div ref={endRef} />
          </div>

          <form onSubmit={(event: FormEvent) => { event.preventDefault(); void send(); }}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about services, projects or hiring…" maxLength={1200} />
            <button disabled={loading || !input.trim()} aria-label="Send message"><Send size={17} /></button>
          </form>
        </section>
      )}

      <button className="learning-chat-launcher" onClick={() => setOpen((current) => !current)} aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}>
        {open ? <X /> : <><MessageCircle /><span>Ask the assistant</span></>}
      </button>
    </div>
  );
}

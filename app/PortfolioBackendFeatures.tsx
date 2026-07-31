"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Bot, CheckCircle2, Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";

type ChatMessage = { role: "user" | "assistant"; content: string };

type FormState = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  service: "Shopify Plus development",
  budget: "",
  timeline: "",
  message: "",
};

const projectScreens = [
  { name: "Maniac Nails", url: "https://maniac-nails.com" },
  { name: "Free The Roots", url: "https://freetheroots.com" },
  { name: "Laudi Vidni", url: "https://laudividni.com" },
  { name: "Starfire Direct", url: "https://starfiredirect.com" },
  { name: "AI Wheel Visualizer", url: "#contact" },
];

function screenshot(url: string, width: number) {
  if (!url.startsWith("http")) return "";
  return `https://image.thum.io/get/width/${width}/crop/900/noanimate/${url}`;
}

function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const handler = (event: Event) => {
      const project = (event as CustomEvent<string>).detail;
      setForm((current) => ({
        ...current,
        message: `I would like to discuss a project similar to ${project}. `,
      }));
    };

    window.addEventListener("portfolio-project-interest", handler);

    return () => {
      window.removeEventListener("portfolio-project-interest", handler);
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setNotice("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to send the inquiry.");
      setStatus("success");
      setNotice(data.message || "Your inquiry has been received.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setNotice(error instanceof Error ? error.message : "Unable to send the inquiry.");
    }
  }

  return (
    <div className="backend-contact-shell">
      <div className="backend-contact-copy">
        <span className="backend-label"><Sparkles size={15} /> Start a project</span>
        <h3>Tell me what you’re building.</h3>
        <p>Share the goals, current platform and timeline. You’ll receive an automatic confirmation, and I’ll review the request personally.</p>
        <div className="backend-response-card">
          <strong>What happens next?</strong>
          <span>01 · Your inquiry is stored securely</span>
          <span>02 · You receive a confirmation email</span>
          <span>03 · I reply with next steps and technical direction</span>
        </div>
      </div>

      <form className="backend-contact-form" onSubmit={submit}>
        <div className="form-grid two">
          <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
          <label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" /></label>
        </div>
        <div className="form-grid two">
          <label>Company<input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company or brand" /></label>
          <label>Service<select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
            <option>Shopify Plus development</option><option>Custom Shopify app</option><option>Headless commerce</option><option>Full-stack web application</option><option>AI and automation</option><option>Performance and CRO</option><option>Technical consulting</option>
          </select></label>
        </div>
        <div className="form-grid two">
          <label>Budget<select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
            <option value="">Select range</option><option>$2k–$5k</option><option>$5k–$10k</option><option>$10k–$25k</option><option>$25k+</option><option>Ongoing engagement</option>
          </select></label>
          <label>Timeline<select value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })}>
            <option value="">Select timeline</option><option>Immediately</option><option>Within one month</option><option>1–3 months</option><option>3+ months</option><option>Still planning</option>
          </select></label>
        </div>
        <label>Project details<textarea required minLength={15} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What are you building, what problem should it solve, and what platform are you using today?" /></label>
        <button className="backend-submit" disabled={status === "sending"} type="submit">
          {status === "sending" ? <><Loader2 className="spin" size={18} /> Sending inquiry</> : <>Send project inquiry <ArrowUpRight size={18} /></>}
        </button>
        {notice && <p className={`form-notice ${status}`}>{status === "success" && <CheckCircle2 size={17} />}{notice}</p>}
      </form>
    </div>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hi — I can explain Farrukh’s Shopify Plus, full-stack and AI services. What are you planning to build?" },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = endRef.current;
    if (!node) return;

    node.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  async function send(text = input) {
    const clean = text.trim();
    if (!clean || loading) return;

    const next = [...messages, { role: "user", content: clean } as ChatMessage];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean, history: messages }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to reach the assistant.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply || "Please use the contact form and Farrukh will respond directly." },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "I’m unable to connect right now. Please send your details through the project form." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`portfolio-chat ${open ? "open" : ""}`}>
      {open && <div className="chat-panel">
        <div className="chat-head"><div><span><Bot size={18} /></span><div><strong>Portfolio Assistant</strong><small>Services · projects · availability</small></div></div><button onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button></div>
        <div className="chat-body">
          <div className="chat-quick">{["Shopify services", "AI solutions", "How pricing works"].map((item) => <button key={item} onClick={() => send(item)}>{item}</button>)}</div>
          {messages.map((message, index) => <div key={index} className={`chat-message ${message.role}`}>{message.content}</div>)}
          {loading && <div className="chat-message assistant typing"><i/><i/><i/></div>}
          <div ref={endRef} />
        </div>
        <form className="chat-input" onSubmit={(event) => { event.preventDefault(); void send(); }}><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about services…" /><button aria-label="Send message" disabled={loading}><Send size={17} /></button></form>
      </div>}
      <button className="chat-launcher" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}>{open ? <X /> : <><MessageCircle /><span>Ask about services</span></>}</button>
    </div>
  );
}

function useProjectEnhancements() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLAnchorElement>(".case-card"));
    const cleanup: Array<() => void> = [];

    cards.forEach((card, index) => {
      const project = projectScreens[index];
      if (!project || card.querySelector(".case-device-showcase")) return;
      card.style.cursor = "pointer";

      if (card.href && card.href !== window.location.href + "#contact") {
        card.target = "_blank";
        card.rel = "noopener noreferrer";
      }

      const media = document.createElement("div");
      media.className = "case-device-showcase";

      if (project.url.startsWith("http")) {
        media.innerHTML = `<div class="device desktop"><div class="device-bar"><i></i><i></i><i></i><span>${project.url.replace("https://", "")}</span></div><img src="${screenshot(project.url, 1400)}" alt="${project.name} desktop website preview" loading="lazy" /></div><div class="device mobile"><div class="mobile-notch"></div><img src="${screenshot(project.url, 520)}" alt="${project.name} mobile website preview" loading="lazy" /></div>`;
      } else {
        media.innerHTML = `<div class="ai-preview"><span>AI / COMPUTER VISION</span><strong>Wheel detection → segmentation → realistic product compositing</strong><div class="ai-grid"></div></div>`;
      }

      const visual = card.querySelector(".case-visual");
      visual?.replaceWith(media);
    });

    const archiveItems = Array.from(document.querySelectorAll<HTMLElement>(".archive-grid > div"));

    archiveItems.forEach((item) => {
      if (item.dataset.enhanced) return;
      item.dataset.enhanced = "true";
      item.tabIndex = 0;
      item.setAttribute("role", "button");
      item.setAttribute("aria-label", `Discuss ${item.textContent?.trim() || "this project"}`);

      const activate = () => {
        const name = item.textContent?.replace(/^\d+/, "").trim() || "this project";
        window.dispatchEvent(new CustomEvent("portfolio-project-interest", { detail: name }));
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      };

      const keyHandler = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      };

      item.addEventListener("click", activate);
      item.addEventListener("keydown", keyHandler);

      cleanup.push(() => {
        item.removeEventListener("click", activate);
        item.removeEventListener("keydown", keyHandler);
        delete item.dataset.enhanced;
      });
    });

    return () => {
      cleanup.forEach((dispose) => dispose());
    };
  }, []);
}

export default function PortfolioBackendFeatures() {
  const [contactTarget, setContactTarget] = useState<HTMLElement | null>(null);
  useProjectEnhancements();

  useEffect(() => {
    const target = document.querySelector<HTMLElement>("#contact");
    setContactTarget(target);
  }, []);

  const contactPortal = useMemo(
    () => (contactTarget ? createPortal(<ContactForm />, contactTarget) : null),
    [contactTarget],
  );

  return <>{contactPortal}<Chatbot /></>;
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "farrukh-portfolio-greeting-last-shown";
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const LANGUAGE_DURATION_MS = 1500;
const EXIT_DELAY_MS = 1100;

const greetings = [
  { language: "English", word: "HELLO", native: "Welcome", colors: ["#8b5cf6", "#06b6d4", "#f8fafc"] },
  { language: "Spanish", word: "HOLA", native: "Bienvenido", colors: ["#f97316", "#ec4899", "#fff7ed"] },
  { language: "Hindi", word: "नमस्ते", native: "स्वागत है", colors: ["#f59e0b", "#fb7185", "#fff7ed"] },
  { language: "Urdu", word: "السلام علیکم", native: "خوش آمدید", rtl: true, colors: ["#10b981", "#14b8a6", "#ecfdf5"] },
  { language: "French", word: "BONJOUR", native: "Bienvenue", colors: ["#3b82f6", "#8b5cf6", "#eff6ff"] },
  { language: "Dutch", word: "HALLO", native: "Welkom", colors: ["#f97316", "#3b82f6", "#fff7ed"] },
  { language: "Hausa", word: "SANNU", native: "Barka da zuwa", colors: ["#22c55e", "#eab308", "#f7fee7"] },
  { language: "Russian", word: "ПРИВЕТ", native: "Добро пожаловать", colors: ["#60a5fa", "#ef4444", "#f8fafc"] },
  { language: "Chinese", word: "你好", native: "欢迎", colors: ["#ef4444", "#f59e0b", "#fff7ed"] },
  { language: "Arabic", word: "أهلاً", native: "أهلاً وسهلاً", rtl: true, colors: ["#06b6d4", "#8b5cf6", "#ecfeff"] },
  { language: "German", word: "HALLO", native: "Willkommen", colors: ["#facc15", "#ef4444", "#fefce8"] },
  { language: "Japanese", word: "こんにちは", native: "ようこそ", colors: ["#fb7185", "#a855f7", "#fff1f2"] },
];

export default function MultilingualGreeting() {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const lastShown = stored ? Number(stored) : 0;
      const eligible = !lastShown || Number.isNaN(lastShown) || Date.now() - lastShown >= ONE_WEEK_MS;
      setShouldShow(eligible);
    } catch {
      setShouldShow(true);
    }
  }, []);

  useEffect(() => {
    if (!shouldShow) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const languageTimer = window.setInterval(() => {
      setIndex((current) => {
        if (current >= greetings.length - 1) {
          window.clearInterval(languageTimer);
          window.setTimeout(() => {
            try {
              window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
            } catch {
              // Complete normally when storage is unavailable.
            }
            setExiting(true);
          }, EXIT_DELAY_MS);
          return current;
        }
        return current + 1;
      });
    }, LANGUAGE_DURATION_MS);

    return () => {
      window.clearInterval(languageTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldShow]);

  useEffect(() => {
    if (!exiting) return;
    const timer = window.setTimeout(() => setShouldShow(false), 1100);
    return () => window.clearTimeout(timer);
  }, [exiting]);

  useEffect(() => {
    if (shouldShow === false) document.body.style.overflow = "";
  }, [shouldShow]);

  const current = greetings[index];
  const letters = useMemo(() => Array.from(current.word), [current.word]);
  const counter = String(index + 1).padStart(2, "0");
  const progress = ((index + 1) / greetings.length) * 100;

  if (shouldShow === null || shouldShow === false) return null;

  const themeStyle = {
    "--shade-a": current.colors[0],
    "--shade-b": current.colors[1],
    "--shade-c": current.colors[2],
  } as React.CSSProperties;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="multi-greeting"
          style={themeStyle}
          role="dialog"
          aria-modal="true"
          aria-label="Multilingual greeting introduction"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%", filter: "blur(22px)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="multi-backdrop" aria-hidden="true" />
          <div className="multi-grid" aria-hidden="true" />
          <div className="multi-orb multi-orb-a" aria-hidden="true" />
          <div className="multi-orb multi-orb-b" aria-hidden="true" />
          <div className="multi-orb multi-orb-c" aria-hidden="true" />

          <div className="multi-topline">
            <span>FS / GLOBAL PORTFOLIO</span>
            <span>{counter} — {String(greetings.length).padStart(2, "0")}</span>
          </div>

          <div className="multi-panel">
            <div className="multi-panel-glow" aria-hidden="true" />
            <div className="multi-center">
              <AnimatePresence mode="wait">
                <motion.div key={current.language} className="multi-language-stage">
                  <motion.div
                    className="multi-language"
                    initial={{ opacity: 0, y: 18, letterSpacing: ".5em" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: ".28em" }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5 }}
                  >
                    {current.language}
                  </motion.div>

                  <motion.h1
                    className="multi-word"
                    dir={current.rtl ? "rtl" : "ltr"}
                    lang={current.language === "Urdu" ? "ur" : current.language === "Arabic" ? "ar" : undefined}
                    initial={{ opacity: 0, y: 90, rotateX: -24, scale: 0.94, filter: "blur(18px)" }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -75, rotateX: 20, scale: 1.04, filter: "blur(16px)" }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {current.rtl ? (
                      <span className="rtl-word">{current.word}</span>
                    ) : (
                      letters.map((letter, letterIndex) => (
                        <motion.span
                          key={`${current.language}-${letter}-${letterIndex}`}
                          initial={{ opacity: 0, y: 50, rotateZ: letterIndex % 2 ? 2 : -2 }}
                          animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                          transition={{ delay: letterIndex * 0.045, duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                      ))
                    )}
                  </motion.h1>

                  <motion.p
                    className="multi-native"
                    dir={current.rtl ? "rtl" : "ltr"}
                    lang={current.language === "Urdu" ? "ur" : current.language === "Arabic" ? "ar" : undefined}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ delay: 0.22, duration: 0.5 }}
                  >
                    {current.native}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="multi-footer">
            <span>Preparing your experience</span>
            <div className="multi-dots" aria-hidden="true">
              {greetings.map((greeting, dotIndex) => (
                <span key={greeting.language} className={dotIndex === index ? "active" : dotIndex < index ? "complete" : ""} />
              ))}
            </div>
          </div>

          <div className="multi-progress-track" aria-hidden="true">
            <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

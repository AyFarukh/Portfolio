"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "farrukh-portfolio-greeting-last-shown";
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const LANGUAGE_DURATION_MS = 720;
const EXIT_DELAY_MS = 650;

const greetings = [
  { language: "English", word: "HELLO", native: "Welcome" },
  { language: "Spanish", word: "HOLA", native: "Bienvenido" },
  { language: "Hindi", word: "नमस्ते", native: "स्वागत है" },
  { language: "Urdu", word: "سلام", native: "خوش آمدید", rtl: true },
  { language: "French", word: "BONJOUR", native: "Bienvenue" },
  { language: "Dutch", word: "HALLO", native: "Welkom" },
  { language: "Hausa", word: "SANNU", native: "Barka da zuwa" },
  { language: "Russian", word: "ПРИВЕТ", native: "Добро пожаловать" },
  { language: "Chinese", word: "你好", native: "欢迎" },
  { language: "Arabic", word: "مرحباً", native: "أهلاً وسهلاً", rtl: true },
  { language: "German", word: "HALLO", native: "Willkommen" },
  { language: "Japanese", word: "こんにちは", native: "ようこそ" },
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
              // The animation still completes when storage is unavailable.
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
    const timer = window.setTimeout(() => setShouldShow(false), 900);
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

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="multi-greeting"
          role="dialog"
          aria-modal="true"
          aria-label="Multilingual greeting introduction"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%", filter: "blur(18px)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="multi-grid" aria-hidden="true" />
          <div className="multi-orb multi-orb-a" aria-hidden="true" />
          <div className="multi-orb multi-orb-b" aria-hidden="true" />

          <div className="multi-topline">
            <span>FS / GLOBAL PORTFOLIO</span>
            <span>{counter} — {String(greetings.length).padStart(2, "0")}</span>
          </div>

          <div className="multi-center">
            <AnimatePresence mode="wait">
              <motion.div key={current.language} className="multi-language-stage">
                <motion.div
                  className="multi-language"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28 }}
                >
                  {current.language}
                </motion.div>

                <motion.h1
                  className="multi-word"
                  dir={current.rtl ? "rtl" : "ltr"}
                  initial={{ opacity: 0, y: 80, rotateX: -25, filter: "blur(15px)" }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -70, rotateX: 22, filter: "blur(14px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {letters.map((letter, letterIndex) => (
                    <motion.span
                      key={`${current.language}-${letter}-${letterIndex}`}
                      initial={{ opacity: 0, y: 45 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: letterIndex * 0.025, duration: 0.38 }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </motion.h1>

                <motion.p
                  className="multi-native"
                  dir={current.rtl ? "rtl" : "ltr"}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.12, duration: 0.3 }}
                >
                  {current.native}
                </motion.p>
              </motion.div>
            </AnimatePresence>
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
            <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.42, ease: "easeOut" }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

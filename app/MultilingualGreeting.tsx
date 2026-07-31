"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

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
  const { scrollYProgress } = useScroll();
  const [index, setIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  const total = greetings.length;
  const stageEnd = 0.34;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const local = Math.min(value / stageEnd, 0.9999);
    setIndex(Math.min(total - 1, Math.floor(local * total)));
    setComplete(value >= stageEnd);
  });

  const current = greetings[index];
  const progress = useTransform(scrollYProgress, [0, stageEnd], [0, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [stageEnd - 0.035, stageEnd], [1, 0]);
  const overlayScale = useTransform(scrollYProgress, [stageEnd - 0.04, stageEnd], [1, 1.04]);
  const counter = String(index + 1).padStart(2, "0");

  const letters = useMemo(() => Array.from(current.word), [current.word]);

  useEffect(() => {
    document.documentElement.style.setProperty("--greeting-index", String(index));
  }, [index]);

  return (
    <section className="multi-greeting-space" aria-label="Multilingual greeting introduction">
      <motion.div
        className={`multi-greeting ${complete ? "is-complete" : ""}`}
        style={{ opacity: overlayOpacity, scale: overlayScale }}
      >
        <div className="multi-grid" aria-hidden="true" />
        <div className="multi-orb multi-orb-a" aria-hidden="true" />
        <div className="multi-orb multi-orb-b" aria-hidden="true" />

        <div className="multi-topline">
          <span>FS / GLOBAL PORTFOLIO</span>
          <span>{counter} — {String(total).padStart(2, "0")}</span>
        </div>

        <div className="multi-center">
          <motion.div
            key={`${current.language}-label`}
            className="multi-language"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {current.language}
          </motion.div>

          <motion.h1
            key={current.language}
            className="multi-word"
            dir={current.rtl ? "rtl" : "ltr"}
            initial={{ opacity: 0, y: 85, rotateX: -28, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -70, rotateX: 25, filter: "blur(14px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {letters.map((letter, letterIndex) => (
              <motion.span
                key={`${letter}-${letterIndex}`}
                initial={{ opacity: 0, y: 55 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: letterIndex * 0.035, duration: 0.45 }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            key={`${current.language}-native`}
            className="multi-native"
            dir={current.rtl ? "rtl" : "ltr"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.4 }}
          >
            {current.native}
          </motion.p>
        </div>

        <div className="multi-footer">
          <div className="multi-scroll-label">
            <motion.span animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ArrowDown size={16} />
            </motion.span>
            Scroll to change language
          </div>
          <div className="multi-dots" aria-hidden="true">
            {greetings.map((greeting, dotIndex) => (
              <span key={greeting.language} className={dotIndex === index ? "active" : ""} />
            ))}
          </div>
        </div>

        <div className="multi-progress-track" aria-hidden="true">
          <motion.div style={{ scaleX: progress }} />
        </div>
      </motion.div>
    </section>
  );
}

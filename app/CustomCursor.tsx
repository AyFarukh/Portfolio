"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    let ringX = -100;
    let ringY = -100;
    let targetX = -100;
    let targetY = -100;
    let frame = 0;

    const move = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = "1";
      }

      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    const animate = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(animate);
    };

    const setInteractive = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const active = Boolean(target?.closest("a, button, input, textarea, select, [role='button']"));
      ringRef.current?.classList.toggle("is-interactive", active);
      dotRef.current?.classList.toggle("is-interactive", active);
    };

    document.documentElement.classList.add("custom-cursor-enabled");
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", setInteractive, { passive: true });
    document.addEventListener("mouseout", setInteractive, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", setInteractive);
      document.removeEventListener("mouseout", setInteractive);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="site-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="site-cursor-dot" aria-hidden="true" />
    </>
  );
}

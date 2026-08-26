"use client";

import { useEffect, useState } from "react";
import { Laptop, Moon, Sun } from "lucide-react";

type ThemePreference = "dark" | "light" | "system";

const STORAGE_KEY = "farrukh-portfolio-theme";

function resolveTheme(preference: ThemePreference) {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function SiteExperience() {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
    const initial = stored === "dark" || stored === "light" || stored === "system" ? stored : "system";
    setPreference(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const resolved = resolveTheme(preference);
      document.documentElement.dataset.theme = resolved;
      document.documentElement.dataset.themePreference = preference;
      document.documentElement.style.colorScheme = resolved;
    };

    apply();
    window.localStorage.setItem(STORAGE_KEY, preference);
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [preference, ready]);

  useEffect(() => {
    const organize = () => {
      const main = document.querySelector("main");
      const about = document.querySelector("#about");
      const experience = document.querySelector("#experience");
      const archive = document.querySelector(".archive");
      const clientSuccess = document.querySelector("#client-success");
      const stack = document.querySelector("#stack-lab");
      const speed = document.querySelector("#speed-lab");
      const type = document.querySelector("#type-lab");

      if (!main || !about || !experience || !archive || !clientSuccess || !stack || !speed || !type) return false;

      main.insertBefore(clientSuccess, about);
      main.insertBefore(stack, experience);
      main.insertBefore(speed, experience);
      main.insertBefore(type, archive);
      document.body.dataset.sectionsOrganized = "true";
      return true;
    };

    if (organize()) return;
    const observer = new MutationObserver(() => {
      if (organize()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleImageError = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement)) return;
      if (!target.getAttribute("src")?.startsWith("/projects/")) return;

      target.style.display = "none";
      target.closest(".device, .project-desktop-frame, .project-mobile-frame")?.classList.add("project-preview-missing");
    };

    document.addEventListener("error", handleImageError, true);
    return () => document.removeEventListener("error", handleImageError, true);
  }, []);

  const options: Array<{ value: ThemePreference; label: string; icon: typeof Sun }> = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Laptop },
  ];

  return (
    <div className="theme-control" role="group" aria-label="Website appearance">
      <span className="theme-control-label">Appearance</span>
      <div className="theme-control-options">
        {options.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            className={preference === value ? "active" : ""}
            aria-pressed={preference === value}
            onClick={() => setPreference(value)}
            title={`${label} appearance`}
          >
            <Icon size={15} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

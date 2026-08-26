"use client";

import { useEffect, useState } from "react";
import { Laptop, Menu, Moon, Sun, X } from "lucide-react";

type ThemePreference = "dark" | "light" | "system";

const STORAGE_KEY = "farrukh-portfolio-theme";

const sectionLinks = [
  ["Work", "#work"],
  ["Client Success", "#client-success"],
  ["About", "#about"],
  ["Stack Lab", "#stack-lab"],
  ["Performance", "#speed-lab"],
  ["Experience", "#experience"],
  ["Type Lab", "#type-lab"],
  ["Project Gallery", "#project-gallery"],
  ["Archive", "#archive"],
  ["Contact", "#contact"],
] as const;

function resolveTheme(preference: ThemePreference) {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function SiteExperience() {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [ready, setReady] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

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
      const work = document.querySelector("#work");
      const clientSuccess = document.querySelector("#client-success");
      const about = document.querySelector("#about");
      const stack = document.querySelector("#stack-lab");
      const type = document.querySelector("#type-lab");
      const speed = document.querySelector("#speed-lab");
      const experience = document.querySelector("#experience");
      const gallery = document.querySelector("#project-gallery");
      const archive = document.querySelector<HTMLElement>(".archive");
      const contact = document.querySelector("#contact");

      if (
        !main ||
        !work ||
        !clientSuccess ||
        !about ||
        !stack ||
        !type ||
        !speed ||
        !experience ||
        !gallery ||
        !archive ||
        !contact
      ) {
        return false;
      }

      archive.id = "archive";

      const insertAfter = (node: Element, reference: Element) => {
        reference.parentNode?.insertBefore(node, reference.nextSibling);
      };

      const orderedSections = [
        clientSuccess,
        about,
        stack,
        type,
        speed,
        experience,
        gallery,
        archive,
        contact,
      ];

      let reference = work;
      orderedSections.forEach((section) => {
        insertAfter(section, reference);
        reference = section;
      });

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

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const options: Array<{ value: ThemePreference; label: string; icon: typeof Sun }> = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Laptop },
  ];

  return (
    <>
      <button
        type="button"
        className={`mobile-nav-toggle ${navOpen ? "open" : ""}`}
        aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={navOpen}
        aria-controls="mobile-section-nav"
        onClick={() => setNavOpen((open) => !open)}
      >
        {navOpen ? <X size={20} /> : <Menu size={20} />}
        <span>{navOpen ? "Close" : "Menu"}</span>
      </button>

      <div
        id="mobile-section-nav"
        className={`mobile-section-nav ${navOpen ? "open" : ""}`}
        aria-hidden={!navOpen}
      >
        <div className="mobile-section-nav-head">
          <strong>Explore portfolio</strong>
          <small>Jump to any section</small>
        </div>
        <nav aria-label="Portfolio sections">
          {sectionLinks.map(([label, href], index) => (
            <a key={href} href={href} onClick={() => setNavOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
            </a>
          ))}
        </nav>
      </div>

      {navOpen && <button className="mobile-nav-backdrop" aria-label="Close navigation" onClick={() => setNavOpen(false)} />}

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
    </>
  );
}

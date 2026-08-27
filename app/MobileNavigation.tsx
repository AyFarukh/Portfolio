"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  ["Work", "#work"],
  ["Expertise", "#expertise"],
  ["About", "#about"],
  ["Experience", "#experience"],
  ["More Work", "#archive"],
  ["Contact", "#contact"],
] as const;

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("mobile-menu-open", open);
    return () => document.documentElement.classList.remove("mobile-menu-open");
  }, [open]);

  return (
    <>
      <header className="mobile-header" aria-label="Mobile site header">
        <a href="#top" className="mobile-brand" aria-label="Farrukh Sultan home"><span aria-hidden="true" /></a>
        <div className="mobile-header-actions">
          <a className="mobile-talk" href="mailto:farukh.5937@gmail.com">Let&apos;s talk <ArrowUpRight size={14} /></a>
          <button type="button" className="mobile-menu-button" aria-expanded={open} aria-controls="mobile-navigation-drawer" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(value => !value)}>
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <button className={`mobile-menu-backdrop ${open ? "open" : ""}`} aria-label="Close navigation" onClick={() => setOpen(false)} />
      <aside id="mobile-navigation-drawer" className={`mobile-menu-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-intro"><span>Farrukh Sultan</span><strong>Shopify Plus · Full Stack</strong><p>Selected work, technical expertise and experience.</p></div>
        <nav aria-label="Portfolio sections">
          {links.map(([label, href], index) => (
            <a key={href} href={href} onClick={() => setOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><ArrowUpRight size={15} /></a>
          ))}
        </nav>
        <a className="mobile-menu-contact" href="mailto:farukh.5937@gmail.com" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={16} /></a>
      </aside>
    </>
  );
}

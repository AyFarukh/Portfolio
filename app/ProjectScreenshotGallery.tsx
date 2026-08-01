"use client";

import { ArrowUpRight } from "lucide-react";

const projects = [
  ["Maniac Nails", "https://maniac-nails.com", "Shopify Plus · Bundles · Custom App"],
  ["Free The Roots", "https://www.freetheroots.com", "Shopify Plus · Theme Architecture · Performance"],
  ["Laudi Vidni", "https://laudividni.com", "Luxury Commerce · Product Configurator"],
  ["Starfire Direct", "https://starfiredirect.com", "Large Catalog · Search · CRO"],
  ["Slingshot Sports", "https://slingshotsports.com", "Commerce Development · Custom Features"],
  ["CPAP Machines Canada", "https://cpapmachinescanada.ca", "Shopify Development · UX Improvements"],
  ["Nectar USA", "https://nectarusa.com", "Storefront Customization · Performance"],
  ["Salty Crush", "https://saltycrush.com.au", "Fashion Commerce · Theme Development"],
  ["Vibe Kayaks", "https://vibekayaks.com", "Outdoor Commerce · Product Experience"],
];

function shot(url: string, width: number) {
  return `https://image.thum.io/get/width/${width}/crop/900/noanimate/${url}`;
}

export default function ProjectScreenshotGallery() {
  return (
    <section id="project-gallery" className="project-gallery section shell" aria-labelledby="project-gallery-title">
      <div className="section-head">
        <div>
          <span className="kicker">09 / Live project previews</span>
          <h2 id="project-gallery-title">Real storefronts.<br />Current production work.</h2>
        </div>
        <p>Live homepage previews are generated from the production URLs so the portfolio stays visually current as the stores evolve.</p>
      </div>

      <div className="project-shot-grid">
        {projects.map(([name, url, type], index) => (
          <a className="project-shot-card" href={url} target="_blank" rel="noreferrer" key={url}>
            <div className="project-shot-browser">
              <div className="project-shot-bar"><i/><i/><i/><span>{new URL(url).hostname}</span></div>
              <img
                src={shot(url, 1200)}
                alt={`${name} live storefront homepage desktop preview`}
                width="1200"
                height="760"
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="project-shot-phone" aria-hidden="true">
                <span />
                <img src={shot(url, 420)} alt="" width="420" height="760" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="project-shot-copy">
              <div><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3></div>
              <p>{type}</p>
              <ArrowUpRight size={18}/>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

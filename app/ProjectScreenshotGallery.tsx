"use client";

import { ArrowUpRight } from "lucide-react";

const projects = [
  { slug: "maniac-nails", name: "Maniac Nails", url: "https://maniac-nails.com", type: "Shopify Plus · Bundles · Custom Apps" },
  { slug: "free-the-roots", name: "Free The Roots", url: "https://freetheroots.com", type: "Shopify · Custom Theme · Performance" },
  { slug: "laudi-vidni", name: "Laudi Vidni", url: "https://laudividni.com", type: "Luxury Commerce · Product Configurator" },
  { slug: "starfire-direct", name: "Starfire Direct", url: "https://starfiredirect.com", type: "Large Catalog · Search · Performance" },
  { slug: "slingshot-sports", name: "Slingshot Sports", url: "https://slingshotsports.com", type: "Commerce · Theme Engineering" },
  { slug: "cpap-machines-canada", name: "CPAP Machines Canada", url: "https://cpapmachinescanada.ca", type: "Commerce · UX · Development" },
  { slug: "nectar-usa", name: "Nectar USA", url: "https://nectarusa.com", type: "Commerce · Frontend Development" },
  { slug: "salty-crush", name: "Salty Crush", url: "https://saltycrush.com.au", type: "Fashion Commerce · Theme Development" },
  { slug: "vibe-kayaks", name: "Vibe Kayaks", url: "https://vibekayaks.com", type: "Outdoor Commerce · Frontend" },
  { slug: "the-cacao-club", name: "The Cacao Club", url: "https://thecacaoclub.com", type: "DTC Commerce · Shopify" },
];

function ProjectImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={(event) => {
        const img = event.currentTarget;
        img.style.display = "none";
        img.parentElement?.classList.add("project-image-missing");
      }}
    />
  );
}

export default function ProjectScreenshotGallery() {
  return (
    <section id="project-gallery" className="project-gallery section shell">
      <div className="project-gallery-head">
        <div>
          <span className="kicker">Selected storefronts</span>
          <h2>Production work,<br />shown as it ships.</h2>
        </div>
        <p>
          Local desktop and mobile captures from live production storefronts.
          No external screenshot service is used.
        </p>
      </div>

      <div className="project-gallery-grid">
        {projects.map((project, index) => (
          <article className="project-shot-card" key={project.slug}>
            <div className="project-shot-meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{project.name}</h3>
                <p>{project.type}</p>
              </div>
              <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`}>
                <ArrowUpRight size={18} />
              </a>
            </div>

            <div className="project-shot-stage">
              <div className="project-desktop-frame">
                <div className="project-browser-bar">
                  <i /><i /><i />
                  <span>{project.url.replace("https://", "")}</span>
                </div>
                <div className="project-image-fallback">
                  <span>{project.name}</span>
                  <small>Screenshot is refreshed automatically from the live storefront.</small>
                </div>
                <ProjectImage
                  src={`/projects/${project.slug}-desktop.webp`}
                  alt={`${project.name} desktop storefront screenshot`}
                />
              </div>

              <div className="project-mobile-frame">
                <div className="project-mobile-notch" />
                <div className="project-image-fallback">
                  <span>{project.name}</span>
                </div>
                <ProjectImage
                  src={`/projects/${project.slug}-mobile.webp`}
                  alt={`${project.name} mobile storefront screenshot`}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

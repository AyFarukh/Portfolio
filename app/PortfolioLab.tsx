"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Gauge,
  Layers3,
  MousePointerClick,
  Network,
  Rocket,
  SlidersHorizontal,
  TerminalSquare,
  Zap,
} from "lucide-react";

type StackGroup =
  "frontend" | "backend" | "commerce" | "data" | "devops" | "design";

const stack: Record<
  StackGroup,
  Array<{ name: string; level: string; last: string; color: string }>
> = {
  frontend: [
    {
      name: "React · Next.js · TypeScript",
      level: "EXPERT",
      last: "active now",
      color: "lime",
    },
    {
      name: "Remix · Hydrogen · RSC",
      level: "EXPERT",
      last: "this month",
      color: "cyan",
    },
    {
      name: "GSAP · Framer Motion · Three.js",
      level: "PROFICIENT",
      last: "this week",
      color: "violet",
    },
    {
      name: "Accessibility · responsive systems",
      level: "EXPERT",
      last: "today",
      color: "pink",
    },
  ],
  backend: [
    {
      name: "Node.js · NestJS · Express",
      level: "EXPERT",
      last: "active now",
      color: "lime",
    },
    {
      name: "Python · FastAPI · Django",
      level: "EXPERT",
      last: "this week",
      color: "cyan",
    },
    {
      name: "REST · GraphQL · Webhooks",
      level: "EXPERT",
      last: "today",
      color: "orange",
    },
    {
      name: "Queues · workers · event systems",
      level: "PROFICIENT",
      last: "this month",
      color: "violet",
    },
  ],
  commerce: [
    {
      name: "Shopify Plus · Liquid · OS 2.0",
      level: "EXPERT",
      last: "active now",
      color: "lime",
    },
    {
      name: "Checkout UI · Functions · Cart Transform",
      level: "EXPERT",
      last: "today",
      color: "cyan",
    },
    {
      name: "Admin API · Storefront API · App Bridge",
      level: "EXPERT",
      last: "this week",
      color: "orange",
    },
    {
      name: "Bundles · subscriptions · B2B · Markets",
      level: "EXPERT",
      last: "today",
      color: "pink",
    },
  ],
  data: [
    {
      name: "PostgreSQL · Prisma · SQL tuning",
      level: "EXPERT",
      last: "today",
      color: "lime",
    },
    {
      name: "MongoDB · Redis · caching",
      level: "PROFICIENT",
      last: "this month",
      color: "cyan",
    },
    {
      name: "Analytics · GA4 · event schemas",
      level: "EXPERT",
      last: "this week",
      color: "orange",
    },
    {
      name: "Search · Algolia · catalog indexing",
      level: "PROFICIENT",
      last: "this quarter",
      color: "violet",
    },
  ],
  devops: [
    {
      name: "Vercel · Netlify · Oxygen",
      level: "EXPERT",
      last: "today",
      color: "lime",
    },
    {
      name: "Docker · Linux · Nginx",
      level: "PROFICIENT",
      last: "this month",
      color: "cyan",
    },
    {
      name: "GitHub Actions · CI/CD",
      level: "EXPERT",
      last: "this week",
      color: "orange",
    },
    {
      name: "Cloudflare · DNS · edge caching",
      level: "EXPERT",
      last: "this month",
      color: "pink",
    },
  ],
  design: [
    {
      name: "Design systems · tokens · components",
      level: "EXPERT",
      last: "today",
      color: "lime",
    },
    {
      name: "Figma handoff · visual QA",
      level: "PROFICIENT",
      last: "this week",
      color: "cyan",
    },
    {
      name: "CRO · product UX · mobile flows",
      level: "EXPERT",
      last: "active now",
      color: "orange",
    },
    {
      name: "Motion systems · micro-interactions",
      level: "PROFICIENT",
      last: "this week",
      color: "violet",
    },
  ],
};

const optimizationRows = [
  [
    "Liquid render path",
    "Profile sections, snippets, loops, metafield access and expensive filters; remove duplicated work and push non-critical rendering below the fold.",
    "Server render",
  ],
  [
    "JavaScript execution",
    "Audit Shopify app embeds, third-party pixels, hydration cost and long tasks; defer, conditionally load and replace oversized dependencies.",
    "Main thread",
  ],
  [
    "Images & media",
    "Generate responsive srcset, correct intrinsic dimensions, AVIF/WebP delivery, preload only the LCP asset and lazy-load non-critical media.",
    "LCP / CLS",
  ],
  [
    "Network waterfall",
    "Collapse duplicate requests, preconnect only critical origins, cache immutable assets, reduce app proxy chatter and remove blocking font chains.",
    "TTFB / INP",
  ],
  [
    "Theme architecture",
    "Split global assets, scope section CSS/JS, avoid DOM duplication, reduce variant payloads and preserve progressive enhancement.",
    "Architecture",
  ],
  [
    "Measurement",
    "Use Lighthouse traces, WebPageTest, Chrome Performance, Shopify Theme Inspector, RUM percentiles and controlled before/after experiments.",
    "Evidence",
  ],
];

export default function PortfolioLab() {
  const [group, setGroup] = useState<StackGroup>("commerce");
  const [size, setSize] = useState(126);
  const [weight, setWeight] = useState(520);
  const [slant, setSlant] = useState(-8);
  const [spacing, setSpacing] = useState(-4);
  const [contrast, setContrast] = useState(62);

  const controls: Array<{
    label: string;
    value: number;
    min: number;
    max: number;
    setter: React.Dispatch<React.SetStateAction<number>>;
  }> = [
    {
      label: "Optical size",
      value: size,
      min: 72,
      max: 160,
      setter: setSize,
    },
    {
      label: "Weight",
      value: weight,
      min: 300,
      max: 800,
      setter: setWeight,
    },
    {
      label: "Slant",
      value: slant,
      min: -14,
      max: 0,
      setter: setSlant,
    },
    {
      label: "Tracking",
      value: spacing,
      min: -8,
      max: 6,
      setter: setSpacing,
    },
    {
      label: "Contrast",
      value: contrast,
      min: 20,
      max: 100,
      setter: setContrast,
    },
  ];
  const typeStyle = useMemo(
    () => ({
      fontSize: `clamp(48px, ${size / 10}vw, ${size}px)`,
      fontWeight: weight,
      fontStyle: slant < 0 ? "italic" : "normal",
      letterSpacing: `${spacing / 100}em`,
      filter: `contrast(${80 + contrast}%)`,
    }),
    [size, weight, slant, spacing, contrast],
  );

  useEffect(() => {
    const smoothLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    );
    const disposers: Array<() => void> = [];
    smoothLinks.forEach((link) => {
      const handler = (event: MouseEvent) => {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      link.addEventListener("click", handler);
      disposers.push(() => link.removeEventListener("click", handler));
    });
    return () => disposers.forEach((dispose) => dispose());
  }, []);

  const preset = (name: string) => {
    if (name === "editorial") {
      setSize(138);
      setWeight(430);
      setSlant(-10);
      setSpacing(-5);
      setContrast(68);
    }
    if (name === "sharp") {
      setSize(116);
      setWeight(720);
      setSlant(0);
      setSpacing(-2);
      setContrast(88);
    }
    if (name === "soft") {
      setSize(108);
      setWeight(500);
      setSlant(0);
      setSpacing(1);
      setContrast(45);
    }
    if (name === "kinetic") {
      setSize(148);
      setWeight(650);
      setSlant(-12);
      setSpacing(-7);
      setContrast(95);
    }
  };

  return (
    <>
      <section id="stack-lab" className="portfolio-lab-section multicolor-zone">
        <div className="lab-shell">
          <div className="lab-kicker">
            <span /> 06 / STACK LAB
          </div>
          <div className="lab-heading-row">
            <div>
              <h2>
                Built with <em>real</em> tools.
                <br />
                Not a wishlist.
              </h2>
              <p>
                Every capability below has shipped in production. Switch
                categories to inspect the working stack.
              </p>
            </div>
            <div className="lab-orbit">
              <TerminalSquare />
              <span>
                PRODUCTION
                <br />
                SYSTEMS
              </span>
            </div>
          </div>
          <div className="stack-console">
            <div className="stack-tabs">
              {(Object.keys(stack) as StackGroup[]).map((item) => (
                <button
                  key={item}
                  className={group === item ? "active" : ""}
                  onClick={() => setGroup(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="stack-command">
              <span>→</span> farrukh --stack <b>{group}</b>
            </div>
            <div className="stack-rows">
              {stack[group].map((item) => (
                <div className="stack-row" key={item.name}>
                  <strong>{item.name}</strong>
                  <span className={`level ${item.color}`}>{item.level}</span>
                  <small>last: {item.last}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="type-lab" className="portfolio-lab-section type-lab-zone">
        <div className="lab-shell">
          <div className="lab-kicker">
            <span /> 07 / VARIABLE TYPE
          </div>
          <h2 className="type-title">
            Built with variable type.
            <br />
            <em>Stress-test</em> it.
          </h2>
          <p className="type-intro">
            One interface. Multiple axes. Drag the controls and watch the
            typography system react in real time.
          </p>
          <div className="type-grid">
            <div className="type-stage">
              <div className="type-sample" style={typeStyle}>
                Aa
              </div>
              <div className="type-mini">FS · Commerce · Systems · Motion</div>
            </div>
            <div className="type-controls">
              {controls.map(({ label, value, min, max, setter }) => (
                <label key={label}>
                  <span>
                    {label}
                    <b>{value}</b>
                  </span>

                  <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => setter(Number(e.target.value))}
                  />
                </label>
              ))}
              <div className="type-presets">
                <span>PRESETS:</span>
                {["editorial", "sharp", "soft", "kinetic"].map((name) => (
                  <button key={name} onClick={() => preset(name)}>
                    {name}
                  </button>
                ))}
              </div>
              <pre>{`font-weight: ${weight};\nfont-style: ${slant < 0 ? "italic" : "normal"};\nletter-spacing: ${spacing / 100}em;\nfont-size: ${size}px;`}</pre>
            </div>
          </div>
        </div>
      </section>

      <section id="speed-lab" className="portfolio-lab-section speed-lab-zone">
        <div className="lab-shell">
          <div className="lab-kicker">
            <span /> 08 / SHOPIFY PERFORMANCE
          </div>
          <div className="speed-hero">
            <div>
              <h2>
                Speed optimization,
                <br />
                <em>measured at the system level.</em>
              </h2>
              <p>
                I optimize the entire commerce delivery path: Shopify rendering,
                theme architecture, app scripts, media, network priority,
                runtime behavior and real-user Core Web Vitals.
              </p>
            </div>
            <div className="speed-score">
              <Gauge />
              <strong>95+</strong>
              <span>
                target Lighthouse
                <br />
                without fake lab wins
              </span>
            </div>
          </div>
          <div className="metric-strip">
            <div>
              <b>LCP</b>
              <strong>&lt; 2.5s</strong>
              <span>hero delivery, font timing, image priority</span>
            </div>
            <div>
              <b>INP</b>
              <strong>&lt; 200ms</strong>
              <span>main-thread control and interaction latency</span>
            </div>
            <div>
              <b>CLS</b>
              <strong>&lt; 0.1</strong>
              <span>stable dimensions and predictable UI</span>
            </div>
            <div>
              <b>TTFB</b>
              <strong>region-aware</strong>
              <span>Shopify edge, app proxy and backend timing</span>
            </div>
          </div>
          <div className="optimization-grid">
            {optimizationRows.map(([title, description, tag], index) => (
              <article key={title}>
                <div className="opt-index">0{index + 1}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span>{tag}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="performance-pipeline">
            {[
              [Network, "Request map"],
              [Layers3, "Theme render"],
              [Zap, "Runtime trim"],
              [Activity, "RUM validation"],
              [Rocket, "Conversion-safe release"],
            ].map(([Icon, label], i) => (
              <div key={String(label)}>
                <span>{typeof Icon !== "string" && <Icon />}</span>
                <b>{String(label)}</b>
                {i < 4 && <i>→</i>}
              </div>
            ))}
          </div>
          <div className="speed-actions">
            <a href="#contact" className="lab-primary">
              <MousePointerClick /> Request a performance audit
            </a>
            <a href="#work" className="lab-secondary">
              View relevant case studies <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

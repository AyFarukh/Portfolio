"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, CheckCircle2, Github, Linkedin, Mail, MapPin } from "lucide-react";

const projects = [
  {
    slug: "maniac-nails",
    index: "01",
    name: "Maniac Nails",
    eyebrow: "Shopify Plus · Full Build · Custom Commerce",
    url: "https://maniac-nails.com",
    description: "A production Shopify Plus storefront built around complex bundle logic, custom checkout behavior and maintainable theme architecture.",
    results: ["Custom bundle architecture", "Checkout extensions", "Cart Transform API"],
    stack: ["Shopify Plus", "React", "Node.js", "Liquid"],
  },
  {
    slug: "free-the-roots",
    index: "02",
    name: "Free The Roots",
    eyebrow: "Shopify Plus · Product Flows · Performance",
    url: "https://freetheroots.com",
    description: "A conversion-focused hair-care storefront with custom product flows, member experiences and purpose-built commerce integrations.",
    results: ["Mobile-first experience", "Custom product logic", "Performance focused"],
    stack: ["Shopify Plus", "Checkout UI", "Custom Apps", "Liquid"],
  },
  {
    slug: "laudi-vidni",
    index: "03",
    name: "Laudi Vidni",
    eyebrow: "Luxury Commerce · Product Configurator",
    url: "https://laudividni.com",
    description: "A premium product experience that lets customers configure leather, lining, hardware and strap combinations directly on the storefront.",
    results: ["Real-time configuration", "Metafield architecture", "Premium responsive UX"],
    stack: ["Shopify", "JavaScript", "AJAX", "Metafields"],
  },
  {
    slug: "starfire-direct",
    index: "04",
    name: "Starfire Direct",
    eyebrow: "Large Catalog · Search · Performance",
    url: "https://starfiredirect.com",
    description: "A large-catalog storefront engineered around product discovery, dynamic filtering and a responsive shopping experience at scale.",
    results: ["500+ SKU catalog", "Search & discovery", "Responsive performance"],
    stack: ["Shopify", "Liquid", "Search & Discovery", "JavaScript"],
  },
];

const expertise = [
  ["Shopify Plus", "Architecture, Functions, Checkout UI Extensions, Cart Transform API and advanced storefront logic."],
  ["Custom Apps", "Private and public app architecture with React, Node.js, GraphQL, webhooks and backend integrations."],
  ["Full Stack", "Next.js, TypeScript, Node.js, NestJS, PostgreSQL, MongoDB, Docker and production API systems."],
  ["AI Products", "Python, FastAPI and computer vision systems integrated into real customer-facing ecommerce workflows."],
];

const experience = [
  ["2022 — Present", "Lead Software Developer", "SuccorSoft Pakistan"],
  ["2019 — 2022", "Lead Software Developer", "EcomExperts Canada"],
  ["2019", "Software Developer", "Calmerc Global I-Tech"],
  ["2017 — 2019", "Freelance Software Developer", "Independent · Upwork"],
];

const moreWork = ["Slingshot Sports", "CPAP Machines Canada", "Nectar USA", "Salty Crush", "Vibe Kayaks", "The Cacao Club", "Dukier", "Coin Mining Central"];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="premium-home">
      <nav className="premium-nav premium-shell">
        <a className="premium-brand" href="#top" aria-label="Farrukh Sultan home">
          <span className="premium-mark" aria-hidden="true" />
          <span><strong>Farrukh Sultan</strong><small>Shopify Plus · Full Stack</small></span>
        </a>
        <div className="premium-links">
          <a href="#work">Work</a>
          <a href="#expertise">Expertise</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
        </div>
        <a className="premium-talk" href="mailto:farukh.5937@gmail.com">Let&apos;s talk <ArrowUpRight size={16} /></a>
      </nav>

      <section id="top" className="premium-hero premium-shell">
        <div className="premium-hero-copy">
          <div className="premium-availability"><i /> Available for remote opportunities</div>
          <h1>Engineering commerce products that <em>perform.</em></h1>
          <p>Senior Shopify Plus and Full Stack Engineer building high-converting storefronts, custom apps, checkout systems and AI-powered ecommerce products.</p>
          <div className="premium-actions">
            <a href="#work" className="premium-primary">View selected work <ArrowUpRight size={17} /></a>
            <a href="mailto:farukh.5937@gmail.com" className="premium-secondary">Start a conversation</a>
          </div>
          <div className="premium-meta"><span><MapPin size={15} /> Lahore, Pakistan</span><span>8+ years experience</span></div>
        </div>

        <div className="premium-proof-card">
          <span className="premium-proof-label">What I solve</span>
          <div className="premium-proof-row"><strong>01</strong><span>Complex Shopify Plus architecture</span></div>
          <div className="premium-proof-row"><strong>02</strong><span>Checkout & conversion bottlenecks</span></div>
          <div className="premium-proof-row"><strong>03</strong><span>Custom app & backend systems</span></div>
          <div className="premium-proof-row"><strong>04</strong><span>AI-powered product experiences</span></div>
          <div className="premium-proof-footer"><span>Shopify Plus</span><span>Full Stack</span><span>AI</span></div>
        </div>
        <a className="premium-scroll" href="#work"><ArrowDown size={17} /> Selected work</a>
      </section>

      <section className="premium-trust">
        <div className="premium-shell premium-trust-inner">
          <span>8+ YEARS</span><i />
          <span>SHOPIFY PLUS</span><i />
          <span>FULL STACK</span><i />
          <span>5★ CLIENT RATING</span><i />
          <span>REMOTE WORLDWIDE</span>
        </div>
      </section>

      <section id="work" className="premium-section premium-shell">
        <Reveal><div className="premium-section-head"><div><span>Selected work</span><h2>Commercial engineering,<br />not portfolio decoration.</h2></div><p>A few projects where architecture, user experience and business goals had to work together in production.</p></div></Reveal>
        <div className="premium-projects">
          {projects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.04}>
              <article className="premium-project">
                <a className="premium-project-media" href={project.url} target="_blank" rel="noreferrer">
                  <div className="premium-browser"><i /><i /><i /><span>{project.url.replace("https://", "")}</span></div>
                  <div className="premium-image-fallback"><strong>{project.name}</strong><span>Production storefront</span></div>
                  <img src={`/projects/${project.slug}-desktop.webp`} alt={`${project.name} storefront`} loading="lazy" />
                  <div className="premium-mobile-preview">
                    <img src={`/projects/${project.slug}-mobile.webp`} alt={`${project.name} mobile storefront`} loading="lazy" />
                  </div>
                </a>
                <div className="premium-project-copy">
                  <div className="premium-project-number">{project.index}</div>
                  <span className="premium-project-eyebrow">{project.eyebrow}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="premium-results">{project.results.map(item => <span key={item}><CheckCircle2 size={15} /> {item}</span>)}</div>
                  <div className="premium-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div>
                  <a className="premium-case-link" href={project.url} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={16} /></a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="client-success-anchor" className="premium-results-band premium-shell">
        <Reveal><div><span className="premium-kicker">Client outcomes</span><h2>Trusted to solve problems<br />that affect revenue.</h2></div></Reveal>
        <div className="premium-result-grid">
          <Reveal delay={0.04}><div><strong>$30K–$40K</strong><span>Monthly revenue reported by a client after delivered commerce work</span></div></Reveal>
          <Reveal delay={0.08}><div><strong>5.0</strong><span>Repeated client reviews across Shopify and full-stack engagements</span></div></Reveal>
          <Reveal delay={0.12}><div><strong>8+</strong><span>Years shipping production software for international businesses</span></div></Reveal>
        </div>
      </section>

      <section id="expertise" className="premium-section premium-shell">
        <Reveal><div className="premium-section-head"><div><span>Expertise</span><h2>Senior-level depth across<br />the commerce stack.</h2></div><p>Focused on systems that need to be maintainable, measurable and reliable after launch.</p></div></Reveal>
        <div className="premium-expertise-grid">
          {expertise.map(([title, description], index) => <Reveal key={title} delay={index * .04}><article><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article></Reveal>)}
        </div>
      </section>

      <section id="about" className="premium-about premium-shell">
        <Reveal><div><span className="premium-kicker">About</span><h2>I bridge technical depth<br />with commercial thinking.</h2></div></Reveal>
        <Reveal delay={.08}><div className="premium-about-copy"><p>For more than eight years, I&apos;ve worked with ecommerce brands across North America, Europe and the Middle East on storefronts, apps, checkout systems, backend platforms and AI-powered products.</p><p>I&apos;m most useful when the problem is technically difficult, commercially important, or both.</p><div className="premium-about-tags"><span>Shopify Plus</span><span>React / Next.js</span><span>Node.js</span><span>Python</span><span>GraphQL</span><span>PostgreSQL</span><span>AI / Computer Vision</span></div></div></Reveal>
      </section>

      <section id="experience" className="premium-section premium-shell">
        <Reveal><div className="premium-section-head"><div><span>Experience</span><h2>From implementation<br />to technical leadership.</h2></div></div></Reveal>
        <div className="premium-timeline">{experience.map(([date, role, company], index) => <Reveal key={date} delay={index * .04}><article><span>{date}</span><h3>{role}</h3><p>{company}</p></article></Reveal>)}</div>
      </section>

      <section id="archive" className="premium-more premium-shell">
        <Reveal><div><span className="premium-kicker">More production work</span><h2>A broader track record.</h2></div></Reveal>
        <div className="premium-more-grid">{moreWork.map((name, index) => <div key={name}><span>{String(index + 1).padStart(2, "0")}</span><strong>{name}</strong></div>)}</div>
      </section>

      <section id="contact" className="premium-contact premium-shell">
        <Reveal><span className="premium-kicker">Start a project</span><h2>Have a difficult commerce<br />problem to solve?</h2><p>Tell me what you&apos;re building, what&apos;s blocking you, and what success needs to look like.</p><a href="mailto:farukh.5937@gmail.com">farukh.5937@gmail.com <ArrowUpRight /></a></Reveal>
        <div className="premium-socials"><a href="https://github.com/AyFarukh" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a><a href="https://www.linkedin.com/in/farrukh-sultan-339721ba/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a><a href="mailto:farukh.5937@gmail.com"><Mail size={17} /> Email</a></div>
      </section>

      <footer className="premium-footer premium-shell"><span>© 2026 Farrukh Sultan</span><span>Shopify Plus · Full Stack · AI</span></footer>
    </main>
  );
}

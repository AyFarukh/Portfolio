"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Code2, Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";

const featured = [
  {
    name: "Maniac Nails",
    type: "Shopify Plus · Full Build · Custom Bundles",
    url: "https://maniac-nails.com",
    description: "A complete Shopify Plus storefront with custom theme architecture, checkout extensions, Cart Transform API bundles, private app features and automated inventory workflows.",
    tags: ["Shopify Plus", "React", "Node.js", "Liquid", "Cart Transform API"],
    accent: "violet",
  },
  {
    name: "Free The Roots",
    type: "Shopify Plus · Custom Theme · Bundle Architecture",
    url: "https://freetheroots.com",
    description: "A mobile-first hair-care commerce experience with custom product flows, bundle checkout logic, members-only access and purpose-built app integrations.",
    tags: ["Shopify Plus", "Checkout UI", "Custom App", "React", "Liquid"],
    accent: "green",
  },
  {
    name: "Laudi Vidni",
    type: "Luxury Commerce · Real-Time Product Configurator",
    url: "https://laudividni.com",
    description: "A premium storefront and product configurator enabling customers to personalize leather, lining, hardware and strap combinations directly on the product page.",
    tags: ["Shopify", "JavaScript", "AJAX", "Metafields", "Liquid"],
    accent: "gold",
  },
  {
    name: "Starfire Direct",
    type: "Large Catalog · Search & Discovery · Performance",
    url: "https://starfiredirect.com",
    description: "A high-volume outdoor living storefront with dynamic filtering, search-focused collection architecture and a polished responsive shopping experience across 500+ SKUs.",
    tags: ["Shopify", "Liquid", "Search & Discovery", "Performance", "JavaScript"],
    accent: "orange",
  },
  {
    name: "AI Wheel Visualizer",
    type: "Computer Vision · Shopify Integration · Product Innovation",
    url: "#contact",
    description: "A Shopify-integrated rim try-on experience that detects vehicle wheels from customer photos and composites selected products in real time using a custom computer vision pipeline.",
    tags: ["Python", "YOLOv8", "OpenCV", "React", "Shopify API"],
    accent: "blue",
  },
];

const archive = [
  "Slingshot Sports", "Keller4Salon", "CPAP Machines Canada", "Global Pigeon Supply",
  "Little Babe Designs", "Prevail Jerky", "Chimney Trail", "The Cacao Club", "Zixley",
  "Nectar USA", "The Twisted Toucan", "Moon FR", "Corps Vie", "Hugo by Paris", "Time Rediscovered",
  "Dukier", "Coin Mining Central", "The Pepper Police", "Aspyn", "Cringewear", "Dalia Online",
  "Coherent HK", "Ipsy", "VIP Travel Expert", "Selfkaire", "Cosh Living", "Supermugs",
  "Hanny & Co", "All About Be", "Health Organic Store", "Strum Shark", "Natural Posture",
  "Toipal", "Leeric", "Urban Sign & Print", "Salty Crush", "Vibe Kayaks", "SlateSky", "Puckshark"
];

const experience = [
  ["2022 — Present", "Lead Software Developer", "SuccorSoft Pakistan", "Shopify Plus architecture, private apps, checkout extensions, AI-powered product tools and scalable backend systems."],
  ["2019 — 2022", "Lead Software Developer", "EcomExperts Canada", "Delivered 15+ ecommerce builds, led conversion and performance programs, and managed a remote development team."],
  ["2019", "Software Developer", "Calmerc Global I-Tech", "Built and refactored service-oriented backends, production APIs and performance-critical application features."],
  ["2017 — 2019", "Freelance Software Developer", "Independent · Upwork", "Delivered Shopify, SaaS and full-stack products for clients across the US, UK and Australia while maintaining a 5-star rating."],
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .75, delay }}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  return (
    <main>
      <motion.div className="progress" style={{ scaleX }} />
      <div className="noise" aria-hidden="true" />

      <nav className="nav shell">
        <a href="#top" className="brand"><span>FS</span><b>Farrukh Sultan</b></a>
        <div className="navlinks">
          <a href="#work">Work</a><a href="#about">About</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href="mailto:farukh.5937@gmail.com">Let&apos;s talk <ArrowUpRight size={16}/></a>
      </nav>

      <section id="top" className="hero shell">
        <div className="orb orb-one"/><div className="orb orb-two"/>
        <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}>
          <span className="status"/> Available for remote opportunities
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>
          I engineer <em>commerce</em><br/>that moves businesses forward.
        </motion.h1>
        <motion.div className="hero-grid" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .15 }}>
          <div className="hero-copy">
            <p>Senior Full Stack Developer specializing in Shopify Plus, custom apps, checkout extensions, headless commerce, React, Node.js, Python and AI-powered product experiences.</p>
            <div className="actions">
              <a className="button primary" href="#work">Explore selected work <ArrowUpRight size={18}/></a>
              <a className="button ghost" href="mailto:farukh.5937@gmail.com">Start a conversation</a>
            </div>
          </div>
          <div className="identity-card">
            <div className="portrait-wrap">
              <img src="https://avatars.githubusercontent.com/u/20953156?v=4" alt="Farrukh Sultan" />
              <div className="portrait-glow"/>
            </div>
            <div><strong>Farrukh Sultan</strong><span><MapPin size={14}/> Lahore, Pakistan</span></div>
          </div>
        </motion.div>
        <div className="stats">
          {[['8+','Years experience'],['25+','Projects delivered'],['20%+','Average conversion lift'],['5★','Upwork rating']].map(([n,l])=><div key={l}><strong>{n}</strong><span>{l}</span></div>)}
        </div>
      </section>

      <section className="marquee"><div>SHOPIFY PLUS · CUSTOM APPS · HEADLESS COMMERCE · REACT · NODE.JS · PYTHON · AI & COMPUTER VISION · GRAPHQL · CHECKOUT EXTENSIONS · </div></section>

      <section id="work" className="section shell">
        <Reveal><div className="section-head"><div><span className="kicker">01 / Selected work</span><h2>Built for impact.<br/>Designed to perform.</h2></div><p>Selected projects combining product thinking, conversion-focused design and production-grade engineering.</p></div></Reveal>
        <div className="case-grid">
          {featured.map((project, index) => (
            <Reveal key={project.name} delay={index * .05}>
              <a href={project.url} target={project.url.startsWith('http') ? '_blank' : undefined} className={`case-card ${project.accent}`}>
                <div className="case-top"><span>0{index + 1}</span><ArrowUpRight/></div>
                <div className="case-visual"><Code2/><span>{project.type}</span></div>
                <h3>{project.name}</h3><p>{project.description}</p>
                <div className="tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="about" className="section about shell">
        <Reveal><span className="kicker">02 / About</span><h2>Technical depth.<br/>Commercial instinct.</h2></Reveal>
        <div className="about-grid">
          <Reveal><p className="lead">For more than eight years, I&apos;ve helped brands across North America, Europe and the Middle East turn ambitious ecommerce ideas into fast, reliable and measurable products.</p></Reveal>
          <Reveal delay={.1}><div className="about-copy"><p>My work spans Shopify Plus architecture, custom applications, checkout extensions, headless storefronts, SaaS platforms and AI-powered experiences. I&apos;m comfortable moving from discovery and system design to implementation, optimization and production ownership.</p><p>I care about clean architecture, accessible interfaces and business outcomes—not technology for technology&apos;s sake.</p></div></Reveal>
        </div>
        <div className="skills">
          {['Shopify Plus','Checkout UI Extensions','Cart Transform API','Liquid & OS 2.0','React / Next.js','Node.js / NestJS','Python / FastAPI','GraphQL','Headless Commerce','PostgreSQL / MongoDB','Docker & CI/CD','Computer Vision & LLMs'].map(skill=><span key={skill}>{skill}</span>)}
        </div>
      </section>

      <section id="experience" className="section shell">
        <Reveal><div className="section-head"><div><span className="kicker">03 / Experience</span><h2>From implementation<br/>to technical leadership.</h2></div></div></Reveal>
        <div className="timeline">
          {experience.map(([date,role,company,desc],i)=><Reveal key={date} delay={i*.05}><article><span>{date}</span><div><h3>{role}</h3><b>{company}</b><p>{desc}</p></div></article></Reveal>)}
        </div>
      </section>

      <section className="section archive shell">
        <Reveal><div className="section-head"><div><span className="kicker">04 / Project archive</span><h2>A broad body of<br/>commerce work.</h2></div><p>Full store builds, redesigns, custom sections, performance improvements and ongoing feature development.</p></div></Reveal>
        <div className="archive-grid">{archive.map((name,i)=><motion.div whileHover={{ y:-4 }} key={name}><span>{String(i+1).padStart(2,'0')}</span>{name}<ArrowUpRight size={15}/></motion.div>)}</div>
      </section>

      <section id="contact" className="contact shell">
        <Sparkles className="spark"/>
        <Reveal><span className="kicker">05 / Contact</span><h2>Have an ambitious<br/>commerce project?</h2><p>Let&apos;s talk about the architecture, experience and engineering needed to make it real.</p>
        <a className="contact-mail" href="mailto:farukh.5937@gmail.com">farukh.5937@gmail.com <ArrowUpRight/></a></Reveal>
        <div className="socials"><a href="https://github.com/AyFarukh" target="_blank"><Github/> GitHub</a><a href="https://www.linkedin.com/in/farrukh-sultan-339721ba/" target="_blank"><Linkedin/> LinkedIn</a><a href="mailto:farukh.5937@gmail.com"><Mail/> Email</a></div>
      </section>

      <footer className="footer shell"><span>© 2026 Farrukh Sultan</span><span>Shopify Plus · Full Stack · AI</span></footer>
    </main>
  );
}

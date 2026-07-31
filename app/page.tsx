"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Code2, Github, Linkedin, Mail, MapPin, MousePointer2, Sparkles, Terminal } from "lucide-react";

const featured = [
  { name: "Maniac Nails", type: "Shopify Plus · Full Build · Custom Bundles", url: "https://maniac-nails.com", description: "A complete Shopify Plus storefront with custom theme architecture, checkout extensions, Cart Transform API bundles, private app features and automated inventory workflows.", tags: ["Shopify Plus", "React", "Node.js", "Liquid", "Cart Transform API"], accent: "violet" },
  { name: "Free The Roots", type: "Shopify Plus · Custom Theme · Bundle Architecture", url: "https://freetheroots.com", description: "A mobile-first hair-care commerce experience with custom product flows, bundle checkout logic, members-only access and purpose-built app integrations.", tags: ["Shopify Plus", "Checkout UI", "Custom App", "React", "Liquid"], accent: "green" },
  { name: "Laudi Vidni", type: "Luxury Commerce · Real-Time Product Configurator", url: "https://laudividni.com", description: "A premium storefront and product configurator enabling customers to personalize leather, lining, hardware and strap combinations directly on the product page.", tags: ["Shopify", "JavaScript", "AJAX", "Metafields", "Liquid"], accent: "gold" },
  { name: "Starfire Direct", type: "Large Catalog · Search & Discovery · Performance", url: "https://starfiredirect.com", description: "A high-volume outdoor living storefront with dynamic filtering, search-focused collection architecture and a polished responsive shopping experience across 500+ SKUs.", tags: ["Shopify", "Liquid", "Search & Discovery", "Performance", "JavaScript"], accent: "orange" },
  { name: "AI Wheel Visualizer", type: "Computer Vision · Shopify Integration · Product Innovation", url: "#contact", description: "A Shopify-integrated rim try-on experience that detects vehicle wheels from customer photos and composites selected products in real time using a custom computer vision pipeline.", tags: ["Python", "YOLOv8", "OpenCV", "React", "Shopify API"], accent: "blue" },
];

const archive = ["Slingshot Sports","Keller4Salon","CPAP Machines Canada","Global Pigeon Supply","Little Babe Designs","Prevail Jerky","Chimney Trail","The Cacao Club","Zixley","Nectar USA","The Twisted Toucan","Moon FR","Corps Vie","Hugo by Paris","Time Rediscovered","Dukier","Coin Mining Central","The Pepper Police","Aspyn","Cringewear","Dalia Online","Coherent HK","Ipsy","VIP Travel Expert","Selfkaire","Cosh Living","Supermugs","Hanny & Co","All About Be","Health Organic Store","Strum Shark","Natural Posture","Toipal","Leeric","Urban Sign & Print","Salty Crush","Vibe Kayaks","SlateSky","Puckshark"];

const experience = [
  ["2022 — Present", "Lead Software Developer", "SuccorSoft Pakistan", "Shopify Plus architecture, private apps, checkout extensions, AI-powered product tools and scalable backend systems."],
  ["2019 — 2022", "Lead Software Developer", "EcomExperts Canada", "Delivered 15+ ecommerce builds, led conversion and performance programs, and managed a remote development team."],
  ["2019", "Software Developer", "Calmerc Global I-Tech", "Built and refactored service-oriented backends, production APIs and performance-critical application features."],
  ["2017 — 2019", "Freelance Software Developer", "Independent · Upwork", "Delivered Shopify, SaaS and full-stack products for clients across the US, UK and Australia while maintaining a 5-star rating."],
];

const bootLines = [
  "hello, world.",
  "initializing commerce systems...",
  "loading shopify architecture...",
  "connecting ai pipelines...",
  "rendering selected work...",
  "welcome to farrukh.dev",
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 42, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-90px" }} transition={{ duration: .85, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Greeting() {
  const [line, setLine] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => setLine(v => {
      if (v >= bootLines.length - 1) { clearInterval(timer); setTimeout(() => setDone(true), 650); return v; }
      return v + 1;
    }), 380);
    return () => clearInterval(timer);
  }, []);
  return <AnimatePresence>{!done && <motion.div className="greeting" initial={{ opacity: 1 }} exit={{ opacity: 0, y: "-100%" }} transition={{ duration: .85, ease: [0.76,0,0.24,1] }}>
    <div className="greeting-grid"/>
    <motion.div className="greeting-ring" animate={{ rotate: 360 }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }}/>
    <div className="greeting-inner">
      <div className="greeting-top"><span>FS / SYSTEM</span><span>2026</span></div>
      <div className="greeting-word"><span>HELLO</span><b>سلام</b></div>
      <div className="boot-lines">{bootLines.map((text, i) => <motion.p key={text} initial={{ opacity: 0, x: -18 }} animate={i <= line ? { opacity: 1, x: 0 } : {}}><span>0{i+1}</span>{text}{i === line && <i/>}</motion.p>)}</div>
      <div className="loader-track"><motion.div animate={{ width: `${((line+1)/bootLines.length)*100}%` }}/></div>
    </div>
  </motion.div>}</AnimatePresence>;
}

function Cursor() {
  const x = useMotionValue(-100); const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 35 });
  const sy = useSpring(y, { stiffness: 500, damping: 35 });
  const fx = useSpring(x, { stiffness: 90, damping: 20 });
  const fy = useSpring(y, { stiffness: 90, damping: 20 });
  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); document.documentElement.style.setProperty("--mx", `${e.clientX}px`); document.documentElement.style.setProperty("--my", `${e.clientY}px`); };
    window.addEventListener("mousemove", move); return () => window.removeEventListener("mousemove", move);
  }, [x,y]);
  return <><motion.div className="cursor-dot" style={{ x: sx, y: sy }}/><motion.div className="cursor-ring" style={{ x: fx, y: fy }}/></>;
}

function CodeWindow() {
  const code = useMemo(() => [
    ["const", " commerce = {"],
    ["  platform:", " 'Shopify Plus',"],
    ["  architecture:", " ['React', 'Node', 'GraphQL'],"],
    ["  conversion:", " '+20%',"],
    ["  scale:", " 'production-ready',"],
    ["};", ""],
    ["ship", "(commerce);"],
  ], []);
  return <motion.div className="code-window" initial={{ opacity: 0, rotateX: 10, y: 40 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} transition={{ delay: 1.1, duration: 1 }}>
    <div className="code-bar"><div><i/><i/><i/></div><span>commerce.ts</span><Terminal size={15}/></div>
    <pre>{code.map(([a,b],i)=><motion.code key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 + i*.09 }}><span className="line-no">{String(i+1).padStart(2,'0')}</span><b>{a}</b>{b}</motion.code>)}</pre>
    <div className="code-status"><span>● ONLINE</span><span>TypeScript</span><span>UTF-8</span></div>
  </motion.div>;
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
  return <main>
    <Greeting/><Cursor/>
    <motion.div className="progress" style={{ scaleX }}/><div className="noise"/><div className="mouse-glow"/>

    <nav className="nav shell">
      <a href="#top" className="brand magnetic"><span>FS</span><b>Farrukh Sultan</b></a>
      <div className="navlinks"><a href="#work">Work</a><a href="#about">About</a><a href="#experience">Experience</a><a href="#contact">Contact</a></div>
      <a className="nav-cta magnetic" href="mailto:farukh.5937@gmail.com">Let&apos;s talk <ArrowUpRight size={16}/></a>
    </nav>

    <section id="top" className="hero shell">
      <div className="hero-gridlines"/><div className="orb orb-one"/><div className="orb orb-two"/>
      <motion.div className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .85 }}><span className="status"/> Available for remote opportunities</motion.div>
      <motion.div className="hero-title-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .95 }}>
        <h1><span>I engineer</span><em>commerce</em><span>that performs.</span></h1>
        <motion.div className="hero-stamp" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}><svg viewBox="0 0 100 100"><path id="circlePath" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" fill="none"/><text><textPath href="#circlePath">SHOPIFY PLUS • FULL STACK • AI • </textPath></text></svg><Code2/></motion.div>
      </motion.div>
      <div className="hero-stage">
        <div className="hero-copy"><p>Senior Full Stack Developer building high-performance Shopify Plus storefronts, custom apps, checkout systems, headless experiences and AI-powered products.</p><div className="actions"><a className="button primary magnetic" href="#work">Explore selected work <ArrowUpRight size={18}/></a><a className="button ghost magnetic" href="mailto:farukh.5937@gmail.com">Start a conversation</a></div><div className="mini-meta"><span><MapPin size={14}/> Lahore, Pakistan</span><span>8+ years experience</span></div></div>
        <CodeWindow/>
      </div>
      <a className="scroll-cue" href="#work"><span>Scroll to explore</span><motion.div animate={{ y: [0,9,0] }} transition={{ repeat: Infinity, duration: 1.6 }}><MousePointer2/><ArrowDown/></motion.div></a>
      <div className="stats">{[['8+','Years experience'],['25+','Projects delivered'],['20%+','Average conversion lift'],['5★','Upwork rating']].map(([n,l])=><div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div>
    </section>

    <section className="marquee"><div>SHOPIFY PLUS · CUSTOM APPS · HEADLESS COMMERCE · REACT · NODE.JS · PYTHON · AI & COMPUTER VISION · GRAPHQL · CHECKOUT EXTENSIONS · SHOPIFY PLUS · CUSTOM APPS · HEADLESS COMMERCE · REACT · NODE.JS · PYTHON · AI & COMPUTER VISION · GRAPHQL · CHECKOUT EXTENSIONS · </div></section>

    <section id="work" className="section shell"><Reveal><div className="section-head"><div><span className="kicker">01 / Selected work</span><h2>Built for impact.<br/>Designed to perform.</h2></div><p>Selected projects combining product thinking, conversion-focused design and production-grade engineering.</p></div></Reveal><div className="case-grid">{featured.map((project,index)=><Reveal key={project.name} delay={index*.05}><a href={project.url} target={project.url.startsWith('http')?'_blank':undefined} className={`case-card ${project.accent}`}><div className="case-top"><span>0{index+1}</span><ArrowUpRight/></div><div className="case-visual"><Code2/><span>{project.type}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div></a></Reveal>)}</div></section>

    <section id="about" className="section about shell"><Reveal><span className="kicker">02 / About</span><h2>Technical depth.<br/>Commercial instinct.</h2></Reveal><div className="about-grid"><Reveal><p className="lead">For more than eight years, I&apos;ve helped brands across North America, Europe and the Middle East turn ambitious ecommerce ideas into fast, reliable and measurable products.</p></Reveal><Reveal delay={.1}><div className="about-copy"><p>My work spans Shopify Plus architecture, custom applications, checkout extensions, headless storefronts, SaaS platforms and AI-powered experiences.</p><p>I care about clean architecture, accessible interfaces and business outcomes—not technology for technology&apos;s sake.</p></div></Reveal></div><div className="skills">{['Shopify Plus','Checkout UI Extensions','Cart Transform API','Liquid & OS 2.0','React / Next.js','Node.js / NestJS','Python / FastAPI','GraphQL','Headless Commerce','PostgreSQL / MongoDB','Docker & CI/CD','Computer Vision & LLMs'].map(skill=><span key={skill}>{skill}</span>)}</div></section>

    <section id="experience" className="section shell"><Reveal><div className="section-head"><div><span className="kicker">03 / Experience</span><h2>From implementation<br/>to technical leadership.</h2></div></div></Reveal><div className="timeline">{experience.map(([date,role,company,desc],i)=><Reveal key={date} delay={i*.05}><article><span>{date}</span><div><h3>{role}</h3><b>{company}</b><p>{desc}</p></div></article></Reveal>)}</div></section>

    <section className="section archive shell"><Reveal><div className="section-head"><div><span className="kicker">04 / Project archive</span><h2>A broad body of<br/>commerce work.</h2></div><p>Full store builds, redesigns, custom sections, performance improvements and ongoing feature development.</p></div></Reveal><div className="archive-grid">{archive.map((name,i)=><motion.div whileHover={{ y:-6, rotateX:2 }} key={name}><span>{String(i+1).padStart(2,'0')}</span>{name}<ArrowUpRight size={15}/></motion.div>)}</div></section>

    <section id="contact" className="contact shell"><Sparkles className="spark"/><Reveal><span className="kicker">05 / Contact</span><h2>Have an ambitious<br/>commerce project?</h2><p>Let&apos;s talk about the architecture, experience and engineering needed to make it real.</p><a className="contact-mail" href="mailto:farukh.5937@gmail.com">farukh.5937@gmail.com <ArrowUpRight/></a></Reveal><div className="socials"><a href="https://github.com/AyFarukh" target="_blank"><Github/> GitHub</a><a href="https://www.linkedin.com/in/farrukh-sultan-339721ba/" target="_blank"><Linkedin/> LinkedIn</a><a href="mailto:farukh.5937@gmail.com"><Mail/> Email</a></div></section>
    <footer className="footer shell"><span>© 2026 Farrukh Sultan</span><span>Shopify Plus · Full Stack · AI</span></footer>
  </main>;
}

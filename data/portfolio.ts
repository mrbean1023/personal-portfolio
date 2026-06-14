/**
 * ============================================================================
 * PORTFOLIO DATA — single source of truth for all site content.
 *
 * Edit this file to update copy, projects, experience, skills and links.
 * No component changes are required: every section reads from here.
 * ============================================================================
 */

/* ----------------------------- Type contracts ----------------------------- */

export type SocialPlatform = "github" | "linkedin" | "mail" | "twitter";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  /** Anchor of the section, e.g. "#projects" */
  href: string;
}

export type TimelineKind = "work" | "education" | "leadership" | "open-source";

export interface TimelineEntry {
  kind: TimelineKind;
  title: string;
  organization: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

export interface Project {
  /** Unique id, also used as React key */
  slug: string;
  title: string;
  tagline: string;
  /** Short copy shown on the card */
  description: string;
  /** Long-form detail shown in the modal */
  problem: string;
  architecture: string;
  results: string[];
  tech: string[];
  demoUrl?: string;
  sourceUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  /** Proficiency 0–100, rendered as a meter */
  level: number;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export interface HeroContent {
  /** Rendered after a dynamic time-of-day prefix: "good evening, i'm" */
  greeting: string;
  name: string;
  /** Phrases cycled by the terminal-style typing animation */
  typedPhrases: string[];
  summary: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  resumeCta: { label: string; href: string };
}

export interface AboutContent {
  heading: string;
  paragraphs: string[];
}

export interface ContactContent {
  heading: string;
  blurb: string;
  email: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteMeta {
  title: string;
  description: string;
  url: string;
  author: string;
}

/* --------------------------------- Content -------------------------------- */

export const siteMeta: SiteMeta = {
  title: "Andrew Neo — Computer Science @ NTU",
  description:
    "Personal portfolio of Andrew Neo, a Computer Science undergraduate at NTU Singapore with a fintech background — enterprise automation at MAS, Ethereum smart contracts, and full-stack web development.",
  url: "https://personal-portfolio-tau-three-30.vercel.app",
  author: "Andrew Neo",
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/mrbean1023",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andrew-neo-ab1760229/",
  },
  { platform: "mail", label: "Email", href: "mailto:andrewneo27@gmail.com" },
];

export const hero: HeroContent = {
  greeting: "i'm",
  name: "Andrew Neo",
  typedPhrases: [
    "I build full-stack web applications.",
    "I automate enterprise workflows.",
    "I ship Ethereum smart contracts.",
    "I turn messy data into dashboards.",
  ],
  summary:
    "Computer Science undergraduate at Nanyang Technological University with a fintech diploma and real-world experience at the Monetary Authority of Singapore — where I built enterprise RPA pipelines and analytics dashboards. I like shipping things end to end, from smart contracts to this very website.",
  primaryCta: { label: "View Projects", href: "#projects" },
  secondaryCta: { label: "Contact Me", href: "#contact" },
  resumeCta: { label: "Résumé", href: "/resume.pdf" },
};

/** Phrases cycled in the scrolling ribbon below the hero */
export const marqueeMotifs: string[] = [
  "constantly learning",
  "always shipping",
  "never boring",
  "fintech curious",
  "automate everything",
];

export const about: AboutContent = {
  heading: "About & Experience",
  paragraphs: [
    "I'm a first-year Computer Science student at NTU Singapore, but my path here ran through fintech: a Diploma in Business & Financial Technology at Nanyang Polytechnic (Director's List, all five semesters), a year at the Monetary Authority of Singapore building robotic process automation, and a final-year project shipping a working Ethereum NFT marketplace.",
    "Outside of code I've led student clubs and hackathon teams, and I unwind with guitar and piano, basketball, running, and a good book. Below is the timeline of where I've worked, studied and led.",
  ],
};

export const timeline: TimelineEntry[] = [
  {
    kind: "education",
    title: "B.Comp. in Computer Science",
    organization: "Nanyang Technological University",
    period: "Aug 2025 — May 2029",
    location: "Singapore",
    summary:
      "Undergraduate Computer Science degree, currently in my first year.",
    highlights: [
      "Completed core modules: Introduction to Computational Thinking & Programming, Linear Algebra for Computing, Digital Logic, and Discrete Mathematics.",
    ],
    tags: ["Computer Science", "Mathematics"],
  },
  {
    kind: "work",
    title: "Business Analyst / RPA Developer",
    organization: "Monetary Authority of Singapore",
    period: "Feb 2023 — May 2023",
    location: "Singapore",
    summary:
      "Continued from my internship into a business analyst role, bridging internal teams, vendors and management.",
    highlights: [
      "Led Agile ceremonies as Scrum Master, coordinating daily stand-ups and sprint reviews across internal teams and external vendors.",
      "Created and presented an interactive Tableau dashboard analysing full-year Service Desk performance, giving management live visibility into workload trends and operational KPIs.",
    ],
    tags: ["Agile", "Tableau", "Stakeholder Management"],
  },
  {
    kind: "work",
    title: "RPA Developer (Intern)",
    organization: "Monetary Authority of Singapore",
    period: "Aug 2022 — Feb 2023",
    location: "Singapore",
    summary:
      "Built robotic process automation for Singapore's central bank in a regulated production environment.",
    highlights: [
      "Designed and deployed two enterprise RPA solutions using Blue Prism, automating workflows across DMS, Excel, Outlook and Skype for Business — saving 50+ hours annually.",
      "Constructed end-to-end automation pipelines covering data cleansing, master file generation and scheduled email reporting, processing weekly datasets of 50+ records.",
    ],
    tags: ["Blue Prism", "RPA", "Excel VBA"],
  },
  {
    kind: "leadership",
    title: "Team Lead — PolyFinTech 100 API Hackathon",
    organization: "Nanyang Polytechnic",
    period: "2022",
    location: "Singapore",
    summary:
      "Led a team representing Nanyang Polytechnic in Singapore's largest student fintech hackathon.",
    highlights: [
      "Advanced to the category finals against teams from polytechnics across Singapore.",
    ],
    tags: ["FinTech", "Hackathon", "Leadership"],
  },
  {
    kind: "education",
    title: "Diploma in Business & Financial Technology (Merit)",
    organization: "Nanyang Polytechnic",
    period: "Apr 2019 — May 2023",
    location: "Singapore",
    summary:
      "Fintech-focused diploma combining software engineering with business and financial domain knowledge.",
    highlights: [
      "Achieved 9 Distinctions and 15 'A' grades; attained the Director's List (top 15% of cohort) in all 5 semesters.",
      "Industry & leadership programmes: Splunk 2020, Capstone Leadership Development Programme, NYP Infosec May CTF 2021, IT Youth Council Digital Youth Ambassador 2021.",
    ],
    tags: ["FinTech", "Software Engineering", "Director's List"],
  },
  {
    kind: "leadership",
    title: "Student Leader / Class Representative",
    organization: "Nanyang Polytechnic — SIT Club EXCO",
    period: "Apr 2019 — May 2023",
    location: "Singapore",
    summary:
      "Served on the School of Information Technology club executive committee throughout my diploma.",
    highlights: [
      "Organised and executed 3+ student events, including NYP Open House for the School of Information Technology and other student engagement initiatives.",
    ],
    tags: ["Leadership", "Event Management"],
  },
];

export const projects: Project[] = [
  {
    slug: "nft-marketplace",
    title: "NFT Marketplace",
    tagline: "Full-stack Ethereum marketplace — NYP final-year project",
    description:
      "A working Ethereum NFT marketplace where 100+ NFTs were minted, listed, sold and auctioned via smart contracts, with MetaMask wallet authentication and real-time bidding.",
    problem:
      "Final-year academic project: build a production-style Web3 marketplace covering the full NFT lifecycle — not just minting, but listing, fixed-price sales, auctions and verifiable on-chain ownership — usable by people with a standard MetaMask wallet.",
    architecture:
      "Smart contracts on Ethereum handle minting, listing, escrowed ETH payments and auction logic, with on-chain ownership validation as the source of truth. The web frontend integrates MetaMask for wallet authentication and transaction signing, and reflects bid activity in real time across 50+ concurrent listings.",
    results: [
      "100+ NFTs minted, listed, sold and auctioned end to end via smart contracts.",
      "Real-time bidding delivered across 50+ listings.",
      "Complete Web3 feature set: wallet auth, on-chain ownership validation and ETH payments.",
    ],
    tech: ["Ethereum", "Smart Contracts", "JavaScript", "MetaMask", "Web3"],
    featured: true,
  },
  {
    slug: "car-services-b2b",
    title: "B2B Car Services Platform",
    tagline: "ASP.NET web application — NYP academic project",
    description:
      "A C# ASP.NET B2B web application for a one-stop car services company: quotations, order tracking, invoicing and searchable transaction history over a 20+ table SQL Server database.",
    problem:
      "A one-stop car services business needed its quotation, ordering and invoicing workflows digitised into a single B2B system, replacing manual processes with end-to-end traceable transactions.",
    architecture:
      "Built on C# ASP.NET with SQL Server managing 20+ relational tables. Core business modules cover service quotation management, order status tracking, invoice generation and searchable transaction history, validated with 30+ simulated users across complete end-to-end workflows.",
    results: [
      "Full quote-to-invoice business workflow implemented end to end.",
      "20+ relational tables designed and managed in SQL Server.",
      "Exercised by 30+ simulated users across complete workflows.",
    ],
    tech: ["C#", "ASP.NET", "SQL Server", "HTML/CSS", "JavaScript"],
    featured: true,
  },
  {
    slug: "mas-rpa",
    title: "Enterprise RPA Suite @ MAS",
    tagline: "Blue Prism automation in a regulated environment",
    description:
      "Two enterprise RPA solutions deployed at the Monetary Authority of Singapore, automating document, spreadsheet and communication workflows and saving 50+ hours annually.",
    problem:
      "Teams at Singapore's central bank were spending hours each week on repetitive, error-prone workflows spanning the document management system, Excel, Outlook and Skype for Business — in an environment where mistakes carry regulatory weight.",
    architecture:
      "Blue Prism process objects orchestrate each system end to end: pipelines perform data cleansing, generate master files, and send scheduled email reports automatically. Built for a regulated production environment with controlled exception handling, processing weekly datasets of 50+ records.",
    results: [
      "Two enterprise RPA solutions designed, built and deployed to production.",
      "50+ hours of manual work eliminated annually.",
      "Weekly datasets processed automatically with full auditability.",
    ],
    tech: ["Blue Prism", "RPA", "Excel", "Outlook Automation"],
    featured: true,
  },
  {
    slug: "service-desk-analytics",
    title: "Service Desk Analytics Dashboard",
    tagline: "Tableau KPI dashboard for management",
    description:
      "An interactive Tableau dashboard analysing a full year of Service Desk performance, presented to management for monitoring workload trends and operational KPIs.",
    problem:
      "Management had no consolidated view of Service Desk performance — workload distribution, resolution trends and operational KPIs lived in scattered exports, making capacity decisions guesswork.",
    architecture:
      "A full year of Service Desk data was cleaned and modelled, then surfaced through an interactive Tableau dashboard with drill-downs by period, category and workload metrics. Designed around the questions management actually asks: who is loaded, what is trending, and where are the bottlenecks.",
    results: [
      "Single live view replacing scattered manual reports.",
      "Presented directly to management and adopted for KPI monitoring.",
      "Enabled data-backed workload and capacity conversations.",
    ],
    tech: ["Tableau", "Data Analysis", "Excel"],
    featured: false,
  },
  {
    slug: "portfolio-website",
    title: "This Portfolio Website",
    tagline: "Next.js 15 + TypeScript + Tailwind + Framer Motion",
    description:
      "The site you're looking at — a fully typed, single-page portfolio with a terminal-style hero, filterable timeline, case-study modals and a serverless contact form, deployed on Vercel.",
    problem:
      "I wanted a portfolio that demonstrates the craft it describes: strict TypeScript, accessible interactions, honest performance — and content fully separated from layout so it stays effortless to update.",
    architecture:
      "Next.js 15 App Router with strict TypeScript throughout. All copy, projects and skills live in a single typed data file consumed by every section. Framer Motion drives scroll reveals, the case-study modal and the active-nav indicator; a Vercel serverless function with honeypot spam protection handles the contact form. Fully static-rendered home page at ~172 kB first-load JS.",
    results: [
      "100% static home page with sub-second first paint on Vercel's edge.",
      "Every word of content editable from one typed data file.",
      "Respects prefers-reduced-motion across all animations.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    demoUrl: "https://personal-portfolio-tau-three-30.vercel.app",
    featured: false,
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "Python", level: 80 },
      { name: "SQL", level: 80 },
      { name: "C#", level: 75 },
      { name: "JavaScript / TypeScript", level: 75 },
      { name: "HTML5 / CSS3", level: 80 },
      { name: "Excel VBA", level: 70 },
    ],
  },
  {
    id: "web",
    label: "Web & Frameworks",
    skills: [
      { name: "ASP.NET", level: 75 },
      { name: "React / Next.js", level: 65 },
      { name: "Tailwind CSS", level: 65 },
      { name: "Node.js", level: 55 },
    ],
  },
  {
    id: "data",
    label: "Data & Automation",
    skills: [
      { name: "Blue Prism (RPA)", level: 85 },
      { name: "Tableau", level: 80 },
      { name: "SQL Server", level: 75 },
      { name: "Excel / Data Cleansing", level: 85 },
    ],
  },
  {
    id: "web3",
    label: "FinTech / Web3",
    skills: [
      { name: "Smart Contracts", level: 65 },
      { name: "Ethereum / Web3", level: 60 },
      { name: "MetaMask Integration", level: 65 },
      { name: "FinTech Domain Knowledge", level: 75 },
    ],
  },
];

export const contact: ContactContent = {
  heading: "Get In Touch",
  blurb:
    "I'm open to internships, part-time engineering roles and interesting collaborations alongside my studies at NTU. Drop me a message and I'll get back to you within a couple of days — I reply to everything.",
  email: "andrewneo27@gmail.com",
};

export const faqs: FaqItem[] = [
  {
    question: "are you open to internships right now?",
    answer:
      "Yes — I'm a first-year Computer Science student at NTU (graduating May 2029) looking for software engineering, data or fintech internships and part-time roles that fit around my studies. The form above or a direct email is the fastest way to reach me.",
  },
  {
    question: "what did you actually do at MAS?",
    answer:
      "Over about a year at the Monetary Authority of Singapore I designed and deployed two enterprise Blue Prism RPA solutions automating workflows across the document management system, Excel, Outlook and Skype for Business — saving 50+ hours annually — then moved into a business analyst role where I ran Agile ceremonies as Scrum Master and built a Tableau dashboard senior management used to track Service Desk KPIs.",
  },
  {
    question: "what's your preferred stack?",
    answer:
      "I'm strongest in Python, C#/ASP.NET and SQL from my diploma and MAS work, and I'm actively levelling up modern web development — this site is Next.js, TypeScript and Tailwind, built end to end. I pick tools to fit the problem rather than the other way around.",
  },
  {
    question: "do you have web3 / fintech experience?",
    answer:
      "My diploma was in Business & Financial Technology, and my final-year project was a working Ethereum NFT marketplace — smart contracts, MetaMask wallet auth, ETH payments and real-time auctions across 50+ listings. I also led an NYP team to the category finals of the PolyFinTech 100 API Hackathon.",
  },
];

export const footer = {
  note: "Designed & built by Andrew Neo",
  year: new Date().getFullYear(),
};

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

export type TimelineKind = "work" | "education" | "open-source";

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
  greeting: string;
  name: string;
  /** Phrases cycled by the terminal-style typing animation */
  typedPhrases: string[];
  summary: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
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

export interface SiteMeta {
  title: string;
  description: string;
  url: string;
  author: string;
}

/* --------------------------------- Content -------------------------------- */

export const siteMeta: SiteMeta = {
  title: "Andrew Neo — Full-Stack Engineer",
  description:
    "Personal portfolio of Andrew Neo, a full-stack engineer building fast, reliable web applications and cloud-native systems.",
  url: "https://andrewneo.dev",
  author: "Andrew Neo",
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { platform: "github", label: "GitHub", href: "https://github.com/andrewneo" },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andrewneo",
  },
  { platform: "mail", label: "Email", href: "mailto:andrewneo27@gmail.com" },
];

export const hero: HeroContent = {
  greeting: "Hi, my name is",
  name: "Andrew Neo",
  typedPhrases: [
    "I build full-stack web applications.",
    "I design cloud-native architectures.",
    "I ship pixel-perfect interfaces.",
    "I automate everything that moves.",
  ],
  summary:
    "Full-stack engineer focused on TypeScript, React and cloud infrastructure. I turn ambiguous product ideas into fast, accessible, production-grade software — and I sweat the details from database schema to the last CSS transition.",
  primaryCta: { label: "View Projects", href: "#projects" },
  secondaryCta: { label: "Contact Me", href: "#contact" },
};

export const about: AboutContent = {
  heading: "About & Experience",
  paragraphs: [
    "I'm a software engineer who enjoys working across the whole stack — shaping APIs and data models on the backend, then making the frontend feel effortless. My happy place is the intersection of developer experience, performance and clean design.",
    "Outside of product work I contribute to open source, write about engineering practices, and tinker with home-lab infrastructure. Below is a snapshot of where I've worked, studied and contributed.",
  ],
};

export const timeline: TimelineEntry[] = [
  {
    kind: "work",
    title: "Senior Full-Stack Engineer",
    organization: "Nimbus Labs",
    period: "2024 — Present",
    location: "Singapore (Remote)",
    summary:
      "Lead engineer on the customer-facing analytics platform, owning architecture from the Postgres schema to the React design system.",
    highlights: [
      "Re-architected the dashboard rendering pipeline, cutting p95 page load from 4.2s to 1.1s.",
      "Introduced trunk-based development and preview deployments, halving cycle time.",
      "Mentor two junior engineers and run the frontend guild.",
    ],
    tags: ["TypeScript", "Next.js", "PostgreSQL", "AWS"],
  },
  {
    kind: "work",
    title: "Software Engineer",
    organization: "Hyperdrive Commerce",
    period: "2021 — 2024",
    location: "Singapore",
    summary:
      "Built and operated high-traffic checkout and payment services for a regional e-commerce platform serving millions of monthly users.",
    highlights: [
      "Designed an idempotent payment-orchestration service handling 2k+ TPS at peak.",
      "Led the migration of five legacy PHP services to typed Node.js microservices.",
      "On-call owner for checkout; drove incident MTTR down 40% with better runbooks.",
    ],
    tags: ["Node.js", "Go", "Kafka", "Kubernetes"],
  },
  {
    kind: "open-source",
    title: "Maintainer",
    organization: "typed-env (OSS)",
    period: "2022 — Present",
    location: "GitHub",
    summary:
      "Maintain a zero-dependency TypeScript library for validating and typing environment variables at startup.",
    highlights: [
      "Grew the project to 1.4k GitHub stars and ~80k monthly npm downloads.",
      "Review community PRs and keep a 100%-typed, 100%-covered codebase.",
    ],
    tags: ["TypeScript", "Open Source", "DX"],
  },
  {
    kind: "education",
    title: "B.Comp. in Computer Science",
    organization: "National University of Singapore",
    period: "2017 — 2021",
    location: "Singapore",
    summary:
      "Focus area in software engineering and distributed systems; graduated with honours.",
    highlights: [
      "Teaching assistant for CS2103 Software Engineering for three semesters.",
      "Final-year project: real-time collaborative code editor over CRDTs.",
    ],
    tags: ["Distributed Systems", "Algorithms"],
  },
];

export const projects: Project[] = [
  {
    slug: "fleetpulse",
    title: "FleetPulse",
    tagline: "Real-time logistics tracking dashboard",
    description:
      "A live operations dashboard that tracks 5,000+ delivery vehicles in real time with map clustering, alerting and replayable route history.",
    problem:
      "The logistics operator relied on hourly CSV exports to monitor its fleet, which meant dispatchers discovered delays and route deviations long after customers did. They needed second-level visibility without overwhelming the on-prem telemetry network.",
    architecture:
      "Vehicle telemetry flows through an MQTT broker into a Go ingestion service that batches and writes to TimescaleDB. A WebSocket gateway fans out deltas to the Next.js frontend, where MapLibre renders clustered markers with viewport-based subscription so the browser only receives data for visible vehicles. Route replay queries are served from continuous aggregates, keeping p95 under 120ms.",
    results: [
      "Dispatcher reaction time to route deviations dropped from ~45 minutes to under 30 seconds.",
      "Handles 5,000 concurrent vehicle streams on two modest VMs.",
      "Replay queries over 30 days of history return in <150ms.",
    ],
    tech: ["Next.js", "TypeScript", "Go", "TimescaleDB", "WebSockets", "MapLibre"],
    demoUrl: "https://fleetpulse-demo.vercel.app",
    sourceUrl: "https://github.com/andrewneo/fleetpulse",
    featured: true,
  },
  {
    slug: "promptsmith",
    title: "PromptSmith",
    tagline: "LLM prompt evaluation & versioning platform",
    description:
      "An internal tool for versioning prompts, running batched evaluations against multiple LLM providers, and diffing output quality across releases.",
    problem:
      "Product teams were editing prompts directly in production code with no way to measure whether a change improved or degraded output quality. Regressions shipped silently and were only caught by user complaints.",
    architecture:
      "Prompts are stored as versioned documents in Postgres with a content-addressed hash. An evaluation runner (Node.js worker pool) executes test suites against Anthropic and OpenAI APIs with concurrency control and exponential backoff, persisting graded results. The Next.js UI renders side-by-side diffs and score trends; grading combines deterministic assertions with model-graded rubrics.",
    results: [
      "Caught 12 prompt regressions pre-release in the first quarter of use.",
      "Evaluation suites of 500 cases complete in under 4 minutes.",
      "Adopted by three product teams as the standard prompt workflow.",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Claude API", "BullMQ", "Redis"],
    sourceUrl: "https://github.com/andrewneo/promptsmith",
    featured: true,
  },
  {
    slug: "typed-env",
    title: "typed-env",
    tagline: "Type-safe environment variables for Node.js",
    description:
      "A zero-dependency library that validates process.env at startup and exposes a fully typed, frozen config object. 1.4k stars on GitHub.",
    problem:
      "Misconfigured environment variables are one of the most common causes of production incidents in Node.js services, and they typically fail deep inside business logic instead of at boot.",
    architecture:
      "A declarative schema builder generates both runtime validators and TypeScript types from a single definition, so the compile-time type and runtime check can never drift apart. Failures are aggregated into a single boot-time report. The library ships dual ESM/CJS builds with zero runtime dependencies and a 2kB footprint.",
    results: [
      "~80k monthly downloads on npm with 100% test coverage.",
      "Adopted as the standard config layer at two previous employers.",
      "Zero open bugs; median issue-to-close time under 5 days.",
    ],
    tech: ["TypeScript", "Node.js", "Vitest", "tsup"],
    demoUrl: "https://www.npmjs.com/package/typed-env",
    sourceUrl: "https://github.com/andrewneo/typed-env",
    featured: true,
  },
  {
    slug: "shelfshare",
    title: "ShelfShare",
    tagline: "Community book-lending PWA",
    description:
      "A progressive web app that lets neighbourhood communities catalogue, lend and reserve books, with offline support and barcode scanning.",
    problem:
      "Local community libraries tracked loans in shared spreadsheets that constantly fell out of date, and members had no way to browse what was available without physically visiting.",
    architecture:
      "A Next.js PWA with service-worker caching for full offline browsing. Book metadata is resolved from the OpenLibrary API via ISBN barcode scanning (WebRTC camera + ZXing). Loans are modelled as an append-only event log in Supabase, which makes the sync/conflict story trivial: clients replay events on reconnect. Push notifications remind borrowers of due dates.",
    results: [
      "Used by 4 community libraries managing ~3,200 books.",
      "Offline-first design survives spotty connectivity at outdoor events.",
      "Loan disputes dropped to zero thanks to the auditable event log.",
    ],
    tech: ["Next.js", "Supabase", "PWA", "Tailwind CSS", "ZXing"],
    demoUrl: "https://shelfshare-demo.vercel.app",
    sourceUrl: "https://github.com/andrewneo/shelfshare",
    featured: false,
  },
  {
    slug: "homelab-iac",
    title: "Homelab IaC",
    tagline: "GitOps-managed home Kubernetes cluster",
    description:
      "Infrastructure-as-code for a 3-node k3s cluster running self-hosted services, fully reconciled from Git with sealed secrets and automated backups.",
    problem:
      "Self-hosted services tend to rot: undocumented manual tweaks accumulate until a disk failure means days of reconstruction from memory.",
    architecture:
      "Three mini-PCs run k3s, bootstrapped by Ansible and reconciled by Flux CD from a public Git repository. Secrets are encrypted with SOPS/age so the repo stays public. Persistent volumes are backed up nightly to Backblaze B2 via Restic with verified restores. Monitoring is Prometheus + Grafana with alerting to a self-hosted ntfy instance.",
    results: [
      "Full cluster rebuild from bare metal to all services in under 35 minutes.",
      "14 self-hosted services with 99.7% measured uptime over a year.",
      "Documentation-as-code: the repo is the runbook.",
    ],
    tech: ["Kubernetes", "Flux CD", "Ansible", "Terraform", "Prometheus"],
    sourceUrl: "https://github.com/andrewneo/homelab",
    featured: false,
  },
  {
    slug: "lintwarden",
    title: "LintWarden",
    tagline: "GitHub App for incremental lint adoption",
    description:
      "A GitHub App that comments only on lint violations introduced by the current PR, letting large legacy codebases adopt strict rules incrementally.",
    problem:
      "Enabling strict lint rules on a legacy codebase produces thousands of pre-existing violations, so teams either fix nothing or drown in noise. CI that fails on old code blocks unrelated work.",
    architecture:
      "A Vercel serverless function receives GitHub webhooks, computes the diff range, and runs ESLint only on changed lines using a two-pass baseline comparison. Violations are posted as inline review comments via the Checks API with suggested fixes where auto-fixable. State is kept stateless — everything derives from the diff — so there is no database to operate.",
    results: [
      "Enabled strict TypeScript ESLint rules on a 400k-LOC codebase with zero big-bang migration.",
      "New-code violation rate dropped 92% in three months.",
      "Median webhook-to-comment latency of 9 seconds.",
    ],
    tech: ["Node.js", "GitHub API", "Vercel Functions", "ESLint"],
    demoUrl: "https://github.com/marketplace",
    sourceUrl: "https://github.com/andrewneo/lintwarden",
    featured: false,
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "TypeScript", level: 95 },
      { name: "JavaScript", level: 95 },
      { name: "Go", level: 80 },
      { name: "Python", level: 75 },
      { name: "SQL", level: 85 },
      { name: "Rust", level: 45 },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "Node.js", level: 90 },
      { name: "Tailwind CSS", level: 90 },
      { name: "tRPC", level: 75 },
      { name: "NestJS", level: 70 },
      { name: "Framer Motion", level: 70 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud / DevOps",
    skills: [
      { name: "AWS", level: 85 },
      { name: "Kubernetes", level: 80 },
      { name: "Terraform", level: 75 },
      { name: "Docker", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "CI/CD (GitHub Actions)", level: 90 },
    ],
  },
  {
    id: "ai",
    label: "AI / ML Tools",
    skills: [
      { name: "Claude API", level: 85 },
      { name: "LangChain", level: 65 },
      { name: "Vector DBs (pgvector)", level: 70 },
      { name: "Prompt Engineering", level: 85 },
      { name: "PyTorch", level: 50 },
    ],
  },
];

export const contact: ContactContent = {
  heading: "Get In Touch",
  blurb:
    "I'm open to interesting full-stack roles, consulting engagements and open-source collaboration. Drop me a message and I'll get back to you within a couple of days.",
  email: "andrewneo27@gmail.com",
};

export const footer = {
  note: "Designed & built by Andrew Neo",
  year: new Date().getFullYear(),
};

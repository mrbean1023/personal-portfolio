# Personal Portfolio

A production-ready personal portfolio built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide icons**. Dark, minimalist developer aesthetic with a terminal-style typing hero, interactive experience timeline, project case-study modals, a categorized skills dashboard, and a validated contact form.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (what Vercel runs)
npm run start    # serve the production build locally
npm run typecheck
```

## Editing your content

**All copy, projects, experience, skills and links live in one file: [`data/portfolio.ts`](data/portfolio.ts).**

No component changes are needed to:

- Change your name, hero phrases, summary, or CTA labels (`hero`)
- Add/remove timeline entries — work, education or open-source (`timeline`)
- Add/remove projects, including the modal's problem/architecture/results copy (`projects`)
- Adjust skill categories and proficiency levels (`skillCategories`)
- Change the scrolling ribbon phrases (`marqueeMotifs`) and the "ask me anything" entries (`faqs`)
- Update social links, contact email and SEO metadata (`socialLinks`, `contact`, `siteMeta`)

Every shape is strictly typed, so the compiler will catch mistakes (`npm run typecheck`).

### Theming

The palette is defined once in [`app/globals.css`](app/globals.css) under `@theme`. To switch the accent from electric blue to emerald, change two lines:

```css
--color-accent: #10b981;
--color-accent-soft: #047857;
```

## Contact form delivery

The form posts to `app/api/contact/route.ts`, which validates server-side (plus a honeypot for bots) and supports three delivery strategies:

### Option 1 — Resend (recommended, built in)

1. Create a free account at [resend.com](https://resend.com) and generate an API key.
2. Set environment variables (locally in `.env.local`, on Vercel under *Project → Settings → Environment Variables*):

   ```bash
   RESEND_API_KEY=re_xxxxxxxx
   # Optional: a verified sender; defaults to onboarding@resend.dev
   CONTACT_FROM_EMAIL="Portfolio <hello@yourdomain.com>"
   ```

3. Done — messages are emailed to the address in `data/portfolio.ts` (`contact.email`).

Without a key, submissions are validated and logged on the server, and the form still reports success — useful for development and previews.

### Option 2 — Formspree (zero backend)

1. Create a form at [formspree.io](https://formspree.io) and copy its endpoint.
2. In `components/Contact.tsx`, change the fetch URL from `/api/contact` to `https://formspree.io/f/YOUR_FORM_ID` and add `Accept: application/json` to the headers.
3. You can then delete `app/api/contact/route.ts` entirely.

### Option 3 — Any other provider

`route.ts` is a plain Vercel serverless function — swap the Resend `fetch` call for SendGrid, Postmark, a Slack webhook, or a database insert.

## Deploying to Vercel

1. Push this repository to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo. Vercel auto-detects Next.js; no configuration needed.
3. Add `RESEND_API_KEY` (if using Resend) and deploy.
4. Update `siteMeta.url` in `data/portfolio.ts` to your production domain for correct Open Graph metadata.

## Project structure

```
app/
  layout.tsx            # Root layout: fonts (Inter + JetBrains Mono), SEO metadata
  page.tsx              # Single-page composition of all sections
  globals.css           # Tailwind v4 theme tokens (palette, fonts)
  icon.svg              # Favicon
  api/contact/route.ts  # Serverless contact endpoint (Resend / log fallback)
components/
  Navbar.tsx            # Sticky glassmorphism nav, scroll-spy, mobile menu
  Hero.tsx              # Time-of-day greeting, typing animation, CTAs
  Marquee.tsx           # Infinite scrolling motif ribbon
  FAQ.tsx               # "ask me anything" accordion
  Timeline.tsx          # Filterable work/education/OSS timeline
  Projects.tsx          # Project grid
  ProjectModal.tsx      # Case-study modal (problem / architecture / results)
  Skills.tsx            # Categorized skills with animated meters
  Contact.tsx           # React Hook Form with client-side validation
  Footer.tsx, Reveal.tsx, SectionHeading.tsx, SocialIcon.tsx
data/
  portfolio.ts          # ★ ALL site content — edit this file
hooks/
  useTypewriter.ts      # Terminal typing animation
  useScrollSpy.ts       # Active-section tracking for the navbar
```

## Accessibility & performance notes

- Honors `prefers-reduced-motion` (reveals, smooth scroll and caret animation degrade gracefully).
- Semantic landmarks, labelled form fields with `role="alert"` errors, focus-managed modal with Escape-to-close.
- Fonts are self-hosted via `next/font` (zero layout shift); no client JS beyond the interactive sections.

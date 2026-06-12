"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { hero, socialLinks } from "@/data/portfolio";
import { useTypewriter } from "@/hooks/useTypewriter";
import SocialIcon from "@/components/SocialIcon";

/** "good morning" / "good afternoon" / "good evening" based on visitor time. */
function timeGreeting(hour: number): string {
  if (hour < 12) return "good morning";
  if (hour < 18) return "good afternoon";
  return "good evening";
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export default function Hero() {
  const typed = useTypewriter(hero.typedPhrases);
  // Server renders a neutral "hello"; the client swaps in the local
  // time-of-day greeting after mount to avoid a hydration mismatch.
  const [greeting, setGreeting] = useState("hello");

  useEffect(() => {
    setGreeting(timeGreeting(new Date().getHours()));
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden"
    >
      {/* Ambient accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <motion.div
        className="mx-auto w-full max-w-6xl px-6 pt-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="mb-4 font-mono text-sm lowercase text-accent sm:text-base"
        >
          {greeting}, {hero.greeting}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          {hero.name}
          <span className="text-accent">.</span>
        </motion.h1>

        {/* Terminal-style typing subtitle */}
        <motion.div
          variants={item}
          className="mt-6 inline-flex max-w-full items-center gap-3 rounded-lg border border-border bg-surface/60 px-4 py-3 font-mono text-sm text-muted shadow-lg shadow-black/20 sm:text-lg"
        >
          <span className="select-none text-accent" aria-hidden="true">
            ~$
          </span>
          <span className="truncate text-foreground" aria-live="polite">
            {typed}
            <span className="terminal-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] bg-accent" />
          </span>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {hero.summary}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={hero.primaryCta.href}
            className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-soft hover:shadow-lg hover:shadow-accent/25"
          >
            {hero.primaryCta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {hero.secondaryCta.label}
          </Link>

          <div className="flex items-center gap-1 sm:ml-2">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="rounded-md p-2.5 text-muted transition-all hover:-translate-y-0.5 hover:text-accent"
              >
                <SocialIcon platform={social.platform} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-faint transition-colors hover:text-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.4, duration: 0.6 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1.4 },
        }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}

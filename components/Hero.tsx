"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
  hidden: { opacity: 0, y: 16 },
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
      className="mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center px-6 pt-14"
    >
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.h1
          variants={item}
          className="lowercase text-3xl leading-snug tracking-tight text-foreground sm:text-5xl sm:leading-snug"
        >
          <span className="text-muted">
            {greeting}, {hero.greeting}{" "}
          </span>
          {hero.name.toLowerCase()}
          <span className="text-accent">{" ✦"}</span>
        </motion.h1>

        {/* Terminal-style typing line */}
        <motion.p
          variants={item}
          className="mt-8 text-sm text-foreground sm:text-base"
          aria-live="polite"
        >
          <span className="select-none text-accent" aria-hidden="true">
            ~${" "}
          </span>
          {typed}
          <span className="terminal-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] bg-accent" />
        </motion.p>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-sm leading-relaxed text-muted sm:text-base"
        >
          {hero.summary}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <Link
            href={hero.primaryCta.href}
            className="group inline-flex items-center gap-2 lowercase text-sm text-foreground transition-colors hover:text-accent"
          >
            {hero.primaryCta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="group inline-flex items-center gap-2 lowercase text-sm text-foreground transition-colors hover:text-accent"
          >
            {hero.secondaryCta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={hero.resumeCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 lowercase text-sm text-muted transition-colors hover:text-accent"
          >
            {hero.resumeCta.label.toLowerCase()}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <span className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 text-muted transition-colors hover:text-accent"
              >
                <SocialIcon platform={social.platform} className="h-4.5 w-4.5" />
              </a>
            ))}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

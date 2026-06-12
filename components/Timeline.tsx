"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  GitFork,
  GraduationCap,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { about, timeline, type TimelineKind } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

type Filter = TimelineKind | "all";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
  { id: "open-source", label: "Open Source" },
];

const kindIcons: Record<TimelineKind, LucideIcon> = {
  work: Briefcase,
  education: GraduationCap,
  "open-source": GitFork,
};

const kindLabels: Record<TimelineKind, string> = {
  work: "Work",
  education: "Education",
  "open-source": "Open Source",
};

export default function Timeline() {
  const [filter, setFilter] = useState<Filter>("all");

  const entries =
    filter === "all" ? timeline : timeline.filter((e) => e.kind === filter);

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <SectionHeading index="01" title={about.heading} />

      <Reveal>
        <div className="mb-12 max-w-3xl space-y-4 text-muted">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      {/* Filter pills */}
      <Reveal>
        <div
          className="mb-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter timeline"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
                filter === f.id
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted hover:border-faint hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Timeline rail */}
      <div className="relative ml-3 border-l border-border pl-8 sm:ml-5">
        <AnimatePresence mode="popLayout">
          {entries.map((entry) => {
            const Icon = kindIcons[entry.kind];
            return (
              <motion.article
                key={`${entry.organization}-${entry.period}`}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="group relative pb-12 last:pb-0"
              >
                {/* Node on the rail */}
                <span className="absolute -left-[45px] flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface transition-colors group-hover:border-accent sm:-left-[47px]">
                  <Icon className="h-3.5 w-3.5 text-accent" />
                </span>

                <div className="rounded-lg border border-border bg-surface/50 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-lg group-hover:shadow-accent/5">
                  <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-xs text-accent">
                      {entry.period}
                    </span>
                    <span className="rounded-full bg-surface-raised px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-faint">
                      {kindLabels[entry.kind]}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">
                    {entry.title}{" "}
                    <span className="text-accent">@ {entry.organization}</span>
                  </h3>

                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-faint">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {entry.location}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {entry.summary}
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight.slice(0, 32)}
                        className="flex gap-2 text-sm text-muted"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}

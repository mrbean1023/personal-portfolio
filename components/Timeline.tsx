"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { about, timeline, type TimelineKind } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

type Filter = TimelineKind | "all";

const kindLabels: Record<TimelineKind, string> = {
  work: "work",
  education: "education",
  leadership: "leadership",
  "open-source": "open source",
};

// Filter options are derived from the kinds actually present in the data,
// so adding/removing timeline entries never leaves an empty filter.
const presentKinds = Array.from(new Set(timeline.map((entry) => entry.kind)));
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "all" },
  ...presentKinds.map((kind) => ({ id: kind as Filter, label: kindLabels[kind] })),
];

export default function Timeline() {
  const [filter, setFilter] = useState<Filter>("all");

  const entries =
    filter === "all" ? timeline : timeline.filter((e) => e.kind === filter);

  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20">
      <SectionHeading index="01" title={about.heading} />

      <Reveal>
        <div className="mb-14 max-w-2xl space-y-4 text-sm leading-relaxed text-muted sm:text-base">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Reveal>

      {/* Filter row — plain lowercase text links */}
      <Reveal>
        <div
          className="mb-2 flex flex-wrap gap-x-6 gap-y-2"
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
              className={`lowercase text-xs transition-colors sm:text-sm ${
                filter === f.id
                  ? "text-accent underline decoration-accent/60 underline-offset-8"
                  : "text-faint hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Flat editorial rows separated by hairlines */}
      <AnimatePresence mode="popLayout">
        {entries.map((entry) => (
          <motion.article
            key={`${entry.organization}-${entry.period}`}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="group grid gap-3 border-b border-border py-9 sm:grid-cols-[180px_1fr] sm:gap-8"
          >
            <div className="text-xs leading-relaxed text-faint">
              <p>{entry.period}</p>
              <p>{entry.location}</p>
              <p className="mt-1 text-accent/80">[{kindLabels[entry.kind]}]</p>
            </div>

            <div>
              <h3 className="lowercase text-base text-foreground transition-colors group-hover:text-accent sm:text-lg">
                {entry.title}{" "}
                <span className="text-muted">@ {entry.organization}</span>
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                {entry.summary}
              </p>

              <ul className="mt-3 space-y-1.5">
                {entry.highlights.map((highlight) => (
                  <li
                    key={highlight.slice(0, 32)}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted"
                  >
                    <span className="select-none text-accent" aria-hidden="true">
                      ›
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>

              <p className="mt-4 lowercase text-xs text-faint">
                {entry.tags.join(" · ")}
              </p>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </section>
  );
}

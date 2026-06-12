"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

function proficiencyLabel(level: number): string {
  if (level >= 90) return "expert";
  if (level >= 75) return "advanced";
  if (level >= 60) return "proficient";
  return "familiar";
}

export default function Skills() {
  const firstCategory = skillCategories[0];
  const [activeId, setActiveId] = useState<string>(firstCategory?.id ?? "");

  const active =
    skillCategories.find((category) => category.id === activeId) ??
    firstCategory;

  if (!active) return null;

  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20">
      <SectionHeading index="03" title="tech stack" />

      <Reveal>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          The tools I reach for, grouped by domain. Meters reflect honest
          self-assessed working proficiency — not buzzword bingo.
        </p>
      </Reveal>

      {/* Category tabs — plain lowercase text links */}
      <Reveal>
        <div
          className="mb-10 flex flex-wrap gap-x-6 gap-y-2"
          role="tablist"
          aria-label="Skill categories"
        >
          {skillCategories.map((category) => {
            const isActive = category.id === active.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(category.id)}
                className={`lowercase text-xs transition-colors sm:text-sm ${
                  isActive
                    ? "text-accent underline decoration-accent/60 underline-offset-8"
                    : "text-faint hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Skill meters */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid gap-x-12 gap-y-7 sm:grid-cols-2"
        >
          {active.skills.map((skill, i) => (
            <div key={skill.name}>
              <div className="mb-2.5 flex items-baseline justify-between">
                <span className="lowercase text-sm text-foreground">
                  {skill.name}
                </span>
                <span className="text-xs text-faint">
                  {proficiencyLabel(skill.level)}
                </span>
              </div>
              <div
                className="h-px overflow-visible bg-border"
                role="meter"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name} proficiency`}
              >
                <motion.div
                  className="h-[3px] -translate-y-[1px] bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.06 * i,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

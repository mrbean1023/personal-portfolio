"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrainCircuit,
  Cloud,
  Code2,
  LayoutTemplate,
  type LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const categoryIcons: Record<string, LucideIcon> = {
  languages: Code2,
  frameworks: LayoutTemplate,
  cloud: Cloud,
  ai: BrainCircuit,
};

function proficiencyLabel(level: number): string {
  if (level >= 90) return "Expert";
  if (level >= 75) return "Advanced";
  if (level >= 60) return "Proficient";
  return "Familiar";
}

export default function Skills() {
  const firstCategory = skillCategories[0];
  const [activeId, setActiveId] = useState<string>(firstCategory?.id ?? "");

  const active =
    skillCategories.find((category) => category.id === activeId) ??
    firstCategory;

  if (!active) return null;

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <SectionHeading index="03" title="Tech Stack" />

      <Reveal>
        <p className="mb-10 max-w-2xl text-muted">
          The tools I reach for daily, grouped by domain. Meters reflect honest
          self-assessed working proficiency — not buzzword bingo.
        </p>
      </Reveal>

      {/* Category tabs */}
      <Reveal>
        <div
          className="mb-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Skill categories"
        >
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.id] ?? Code2;
            const isActive = category.id === active.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(category.id)}
                className={`relative inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:border-faint hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
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
          className="grid gap-x-10 gap-y-6 sm:grid-cols-2"
        >
          {active.skills.map((skill, i) => (
            <div key={skill.name}>
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-sm font-medium text-foreground">
                  {skill.name}
                </span>
                <span className="font-mono text-xs text-faint">
                  {proficiencyLabel(skill.level)}
                </span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-surface-raised"
                role="meter"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name} proficiency`}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent-soft to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.08 * i,
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

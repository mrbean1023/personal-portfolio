"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  Github,
  Layers,
  Target,
  X,
} from "lucide-react";
import type { Project } from "@/data/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Escape to close + scroll lock + focus the dialog while open
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
        >
          <motion.div
            className="max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-border bg-surface shadow-2xl shadow-black/50 sm:rounded-2xl"
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-border bg-surface/95 px-6 py-5 backdrop-blur-sm sm:px-8">
              <div>
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-accent sm:text-sm">
                  {project.tagline}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="rounded-md p-2 text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-8 px-6 py-6 sm:px-8 sm:py-8">
              {/* Problem */}
              <section>
                <h4 className="mb-2 flex items-center gap-2 font-mono text-sm font-semibold text-accent">
                  <Target className="h-4 w-4" />
                  Problem
                </h4>
                <p className="text-sm leading-relaxed text-muted">
                  {project.problem}
                </p>
              </section>

              {/* Architecture */}
              <section>
                <h4 className="mb-2 flex items-center gap-2 font-mono text-sm font-semibold text-accent">
                  <Layers className="h-4 w-4" />
                  Architecture
                </h4>
                <p className="text-sm leading-relaxed text-muted">
                  {project.architecture}
                </p>
              </section>

              {/* Results */}
              <section>
                <h4 className="mb-3 flex items-center gap-2 font-mono text-sm font-semibold text-accent">
                  <CheckCircle2 className="h-4 w-4" />
                  Results
                </h4>
                <ul className="space-y-2">
                  {project.results.map((result) => (
                    <li
                      key={result.slice(0, 32)}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {result}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Tech + links */}
              <section className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-accent/10 px-2 py-1 font-mono text-xs text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Source
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-soft"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

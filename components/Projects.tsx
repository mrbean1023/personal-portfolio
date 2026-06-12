"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Folder, Github, Plus } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ProjectModal from "@/components/ProjectModal";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <SectionHeading index="02" title="Projects" />

      <Reveal>
        <p className="mb-12 max-w-2xl text-muted">
          A selection of things I&apos;ve built — click any card for the full
          story: the problem, the architecture and what it achieved.
        </p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={Math.min(i * 0.07, 0.35)}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="group flex h-full flex-col rounded-lg border border-border bg-surface/50 p-6 transition-colors duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5"
            >
              <div className="mb-5 flex items-start justify-between">
                <Folder className="h-9 w-9 text-accent" strokeWidth={1.25} />
                <div className="flex items-center gap-1">
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source code on GitHub`}
                      className="rounded-md p-2 text-muted transition-colors hover:text-accent"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4.5 w-4.5" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="rounded-md p-2 text-muted transition-colors hover:text-accent"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4.5 w-4.5" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                {project.title}
              </h3>
              <p className="mt-0.5 font-mono text-xs text-faint">
                {project.tagline}
              </p>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
                {project.tech.slice(0, 4).map((tech) => (
                  <span key={tech} className="font-mono text-xs text-faint">
                    {tech}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="font-mono text-xs text-faint">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelected(project)}
                className="mt-5 inline-flex items-center gap-1.5 self-start rounded-md border border-border px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Plus className="h-3.5 w-3.5" />
                Case study
              </button>
            </motion.article>
          </Reveal>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

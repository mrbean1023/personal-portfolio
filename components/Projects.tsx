"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ProjectModal from "@/components/ProjectModal";
import ProjectCover from "@/components/ProjectCover";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector("article");
    const step = card ? card.clientWidth + 20 : 340;
    scroller.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20">
      <SectionHeading index="02" title="deployed work" />

      <Reveal>
        <div className="mb-10 flex items-end justify-between gap-6">
          <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Things I&apos;ve built and shipped — scroll through, or open a card
            for the full story: problem, architecture and results.
          </p>
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Scroll projects left"
              className="border border-border p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Scroll projects right"
              className="border border-border p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div
          ref={scrollerRef}
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2"
        >
          {projects.map((project, i) => (
            <article
              key={project.slug}
              className="group flex w-[19rem] shrink-0 snap-start flex-col overflow-hidden border border-border bg-surface/30 transition-colors duration-300 hover:border-accent/50 sm:w-80"
            >
              <ProjectCover project={project} index={i} />

              <div className="flex flex-1 flex-col p-6">
                <h3 className="lowercase text-base text-foreground transition-colors group-hover:text-accent sm:text-lg">
                  {project.title}
                </h3>
                <p className="mt-1 lowercase text-xs text-faint">
                  {project.tagline}
                </p>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <p className="mt-5 lowercase text-xs leading-relaxed text-faint">
                  {project.tech.join(" · ")}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  className="group/btn inline-flex items-center gap-1.5 lowercase text-xs text-foreground transition-colors hover:text-accent"
                >
                  case study
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                </button>
                <span className="flex items-center gap-1">
                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source code on GitHub`}
                      className="p-1.5 text-muted transition-colors hover:text-accent"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="p-1.5 text-muted transition-colors hover:text-accent"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <p className="mt-4 text-xs text-faint sm:hidden" aria-hidden="true">
          ← swipe →
        </p>
      </Reveal>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

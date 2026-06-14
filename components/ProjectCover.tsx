import {
  Boxes,
  Car,
  BarChart3,
  Workflow,
  Terminal,
  Folder,
  type LucideIcon,
} from "lucide-react";
import type { Project } from "@/data/portfolio";

/** Per-project glyph used in the generated cover art. */
const coverIcons: Record<string, LucideIcon> = {
  "nft-marketplace": Boxes,
  "car-services-b2b": Car,
  "mas-rpa": Workflow,
  "service-desk-analytics": BarChart3,
  "portfolio-website": Terminal,
};

interface ProjectCoverProps {
  project: Project;
  /** Card index, shown as a corner label */
  index: number;
}

/**
 * Cover banner for a project card.
 *
 * If `project.image` is set, it renders that screenshot. Otherwise it draws
 * an on-brand generated cover — a warm gradient wash with the project's glyph
 * watermark — so the gallery looks designed before real screenshots exist.
 */
export default function ProjectCover({ project, index }: ProjectCoverProps) {
  const Icon = coverIcons[project.slug] ?? Folder;
  const label = String(index + 1).padStart(2, "0");

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-surface">
      {project.image ? (
        // eslint-disable-next-line @next/next/no-img-element -- local /public asset, sizes are fixed by the card
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div
          className="relative flex h-full w-full items-center justify-center"
          style={{
            backgroundImage:
              "radial-gradient(circle at 78% 18%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 60%), linear-gradient(150deg, var(--color-surface-raised), var(--color-background))",
          }}
          aria-hidden="true"
        >
          {/* faint dotted grid */}
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "radial-gradient(color-mix(in oklab, var(--color-border) 70%, transparent) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <Icon
            className="relative h-12 w-12 text-accent transition-transform duration-500 group-hover:scale-110"
            strokeWidth={1.25}
          />
        </div>
      )}

      {/* corner index label */}
      <span className="absolute left-3 top-3 rounded bg-background/70 px-1.5 py-0.5 text-[10px] text-faint backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}

import Reveal from "@/components/Reveal";

interface SectionHeadingProps {
  /** Monospace index label, e.g. "01" */
  index: string;
  title: string;
}

export default function SectionHeading({ index, title }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mb-10 flex items-center gap-4">
        <h2 className="flex items-baseline gap-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          <span className="font-mono text-base font-normal text-accent sm:text-lg">
            {index}.
          </span>
          {title}
        </h2>
        <div className="h-px max-w-64 flex-1 bg-border" aria-hidden="true" />
      </div>
    </Reveal>
  );
}

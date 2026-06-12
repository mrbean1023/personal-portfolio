import Reveal from "@/components/Reveal";

interface SectionHeadingProps {
  /** Monospace index label, e.g. "01" */
  index: string;
  title: string;
}

/** Editorial section break: hairline, lowercase title left, number right. */
export default function SectionHeading({ index, title }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mb-12 flex items-baseline justify-between border-t border-border pt-5">
        <h2 className="lowercase text-lg tracking-tight text-foreground sm:text-xl">
          {title}
        </h2>
        <span className="text-xs text-faint" aria-hidden="true">
          {index}
        </span>
      </div>
    </Reveal>
  );
}

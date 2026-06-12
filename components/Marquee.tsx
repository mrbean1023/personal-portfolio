import { marqueeMotifs } from "@/data/portfolio";

/**
 * Infinite scrolling ribbon of motifs, inspired by the
 * "constantly learning ✦ always improving ✦" strip on anselmlong.com.
 * Pure CSS animation (see .marquee-track in globals.css); pauses for
 * users who prefer reduced motion.
 */
export default function Marquee() {
  // Two identical copies make the -50% translate loop seamless;
  // each copy repeats the motif list so it spans ultra-wide screens.
  const copy = Array.from({ length: 3 }, () => marqueeMotifs).flat();

  return (
    <div
      className="overflow-hidden border-y border-border bg-surface/40 py-3"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {copy.map((motif, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center font-mono text-xs lowercase tracking-wider text-faint sm:text-sm"
              >
                <span className="px-4">{motif}</span>
                <span className="text-accent">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

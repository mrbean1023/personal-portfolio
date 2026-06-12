"use client";

import { useEffect, useState } from "react";

interface TypewriterOptions {
  typeSpeedMs?: number;
  deleteSpeedMs?: number;
  /** Pause after a phrase is fully typed before deleting */
  holdMs?: number;
  /** Pause after a phrase is fully deleted before typing the next */
  restMs?: number;
}

/**
 * Cycles through `phrases`, typing and deleting them character by character.
 * Returns the currently visible slice of text.
 */
export function useTypewriter(
  phrases: readonly string[],
  {
    typeSpeedMs = 55,
    deleteSpeedMs = 28,
    holdMs = 1800,
    restMs = 400,
  }: TypewriterOptions = {},
): string {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;
    const phrase = phrases[phraseIndex % phrases.length] ?? "";

    let delay: number;
    let action: () => void;

    if (!deleting && charCount < phrase.length) {
      delay = typeSpeedMs;
      action = () => setCharCount((c) => c + 1);
    } else if (!deleting) {
      delay = holdMs;
      action = () => setDeleting(true);
    } else if (charCount > 0) {
      delay = deleteSpeedMs;
      action = () => setCharCount((c) => c - 1);
    } else {
      delay = restMs;
      action = () => {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      };
    }

    const timer = window.setTimeout(action, delay);
    return () => window.clearTimeout(timer);
  }, [phrases, phraseIndex, charCount, deleting, typeSpeedMs, deleteSpeedMs, holdMs, restMs]);

  const current = phrases[phraseIndex % phrases.length] ?? "";
  return current.slice(0, charCount);
}

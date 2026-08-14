"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const phrases = [
  "analytical product interfaces",
  "event-driven backend workflows",
  "real-time platform services",
  "self-hosted LLM infrastructure",
  "reliable multi-service environments",
] as const;

export function RotatingRole() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % phrases.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const phrase = phrases[activeIndex];

  if (reduceMotion) {
    return <span className="text-gradient">{phrases[0]}</span>;
  }

  return (
    <span className="relative inline-grid min-h-[1.1em] min-w-[min(100%,13.6ch)] align-bottom" aria-label={phrases.join(", ")}>
      <span className="sr-only">{phrases.join(", ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={phrase}
          className="text-gradient col-start-1 row-start-1 inline-flex flex-wrap gap-x-[0.24em]"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.045 } },
            exit: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
          }}
          aria-hidden="true"
        >
          {phrase.split(" ").map((word) => (
            <motion.span
              key={word}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 22, filter: "blur(10px)", rotateX: -35 },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  rotateX: 0,
                  transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
                },
                exit: {
                  opacity: 0,
                  y: -18,
                  filter: "blur(8px)",
                  rotateX: 28,
                  transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
                },
              }}
              style={{ transformOrigin: "50% 100%" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

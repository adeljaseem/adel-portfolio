"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

const SECTION_MAP: Record<string, ComponentType> = {
  "#about": About,
  "#experience": Experience,
  "#skills": Skills,
  "#work": Projects,
  "#contact": Contact,
};

const LABELS: Record<string, string> = {
  "#about": "About",
  "#experience": "Experience",
  "#skills": "Skills",
  "#work": "Work",
  "#contact": "Contact",
};

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="mono-tag inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs text-mist transition-colors hover:border-signal hover:text-signal"
    >
      <ArrowLeft className="size-3.5" />
      Back to the map
    </button>
  );
}

export function ContentView({ section, onBack }: { section: string; onBack: () => void }) {
  const Section = SECTION_MAP[section];
  if (!Section) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-void"
    >
      <div className="sticky top-0 z-30 border-b border-line bg-void/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <BackButton onBack={onBack} />
          <span className="mono-tag text-[11px] text-mist-dim">{LABELS[section]}</span>
        </div>
      </div>

      <Section />

      <div className="border-t border-line py-10 text-center">
        <BackButton onBack={onBack} />
      </div>
    </motion.div>
  );
}

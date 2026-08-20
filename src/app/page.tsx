"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AllSections } from "@/components/AllSections";

const WalkableWorld = dynamic(
  () => import("@/components/three/WalkableWorld").then((module) => module.WalkableWorld),
  { ssr: false }
);

type View = "plain" | "world";

export default function Home() {
  const [view, setView] = useState<View>("plain");

  const openWorld = useCallback(() => setView("world"), []);
  const openPlainPortfolio = useCallback(() => setView("plain"), []);

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to portfolio content
      </a>

      <div id="main">
        <AnimatePresence mode="wait" initial={false}>
          {view === "plain" ? (
            <AllSections key="plain" onOpenWorld={openWorld} />
          ) : (
            <WalkableWorld
              key="world"
              onEnterSection={() => undefined}
              onExitWorld={openPlainPortfolio}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

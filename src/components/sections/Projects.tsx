"use client";

import { Lock } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealStagger, staggerItem } from "@/components/ui/Reveal";
import { TechChip } from "@/components/ui/TechBadge";
import { featuredProject, secondaryProjects, earlierBuilds, pipeline } from "@/lib/data";
import { motion } from "framer-motion";

export function Projects() {
  return (
    <section id="work" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          channel="03"
          label="Work"
          title="Selected projects"
          description="A mix of production systems, client work, and products I built on my own."
        />

        {/* Featured case study */}
        <Reveal delay={0.1} className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-line bg-panel/40">
            <div className="bg-grid bg-scan border-b border-line p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="mono-tag inline-flex items-center gap-1.5 rounded-full border border-line bg-void/60 px-3 py-1 text-[10px] text-mist">
                  <Lock className="size-3" />
                  {featuredProject.tag}
                </span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
                {featuredProject.name}
              </h3>
              <p className="mt-1 text-signal">{featuredProject.role}</p>
              <p className="mt-5 max-w-3xl leading-relaxed text-mist">
                {featuredProject.description}
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {featuredProject.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-sm text-mist">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-pulse" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {featuredProject.stack.map((tech) => (
                  <TechChip key={tech} name={tech} />
                ))}
              </div>
            </div>

            {/* pipeline diagram */}
            <div className="p-8 sm:p-10">
              <p className="mono-tag mb-5 text-[11px] text-mist-dim">
                Signal pipeline with ten stages
              </p>
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-3">
                {pipeline.map((stage, i) => (
                  <div key={stage.n} className="flex items-center gap-1.5">
                    <div className="flex items-center gap-2 rounded-lg border border-line bg-void/50 px-3 py-2">
                      <span className="font-mono text-[11px] text-pulse">
                        {stage.n}
                      </span>
                      <span className="text-xs whitespace-nowrap text-mist">
                        {stage.label}
                      </span>
                    </div>
                    {i < pipeline.length - 1 && (
                      <span className="text-mist-dim" aria-hidden>
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Secondary projects */}
        <RevealStagger className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {secondaryProjects.map((project) => (
            <motion.div
              key={project.name}
              variants={staggerItem}
              className="flex h-full flex-col rounded-xl border border-line bg-panel/30 p-6 transition-colors hover:border-signal/40"
            >
              <span className="mono-tag text-[10px] text-mist-dim">
                {project.tag}
              </span>
              <h4 className="mt-2 font-display text-xl font-semibold text-ink">
                {project.name}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {project.description}
              </p>
              {project.highlights?.length ? (
                <ul className="mt-4 space-y-2">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2 text-xs leading-5 text-mist">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {project.stack.map((tech) => (
                  <TechChip key={tech} name={tech} />
                ))}
              </div>
            </motion.div>
          ))}
        </RevealStagger>

        {/* Earlier builds */}
        <Reveal delay={0.15} className="mt-8">
          <div className="rounded-xl border border-line bg-panel/20 p-6">
            <p className="mono-tag mb-4 text-[11px] text-mist-dim">
              Earlier builds
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {earlierBuilds.map((project) => (
                <div key={project.name} className="group">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-ink">
                      {project.name}
                    </span>
                    {project.codeHref && (
                      <a
                        href={project.codeHref}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.name} source on GitHub`}
                        className="text-mist-dim transition-colors hover:text-signal"
                      >
                        <SiGithub className="size-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-mist-dim">{project.tag}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

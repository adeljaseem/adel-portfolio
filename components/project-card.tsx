import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { Reveal } from "@/components/reveal";
import type { Project } from "@/lib/portfolio-data";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Reveal delay={index * 0.055} className="h-full">
      <article className="project-card group grid h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-3 transition duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.04]">
        <ProjectVisual kind={project.kind} compact />
        <div className="flex flex-1 flex-col px-3 pb-4 pt-6 sm:px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-200/75">
              {project.eyebrow}
            </p>
            {project.latest ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.1em] text-cyan-100">
                <Sparkles size={11} aria-hidden="true" />
                Latest
              </span>
            ) : (
              <span className="text-xs text-slate-500">{project.period}</span>
            )}
          </div>

          <h3 className="font-display mt-4 text-balance text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
            {project.shortTitle}
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            {project.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/[0.075] bg-[#07101a]/70 px-2.5 py-1.5 text-[11px] text-slate-300"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 5 ? (
              <span className="rounded-lg border border-white/[0.075] bg-[#07101a]/70 px-2.5 py-1.5 text-[11px] text-slate-500">
                +{project.tags.length - 5}
              </span>
            ) : null}
          </div>

          <Link
            href={`/work/${project.slug}`}
            className="mt-7 inline-flex items-center gap-2 self-start rounded-xl text-sm font-medium text-white transition hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            Read case study
            <ArrowUpRight
              size={16}
              className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

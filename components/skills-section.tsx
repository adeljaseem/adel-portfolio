import type { ComponentType } from "react";
import {
  Activity,
  BrainCircuit,
  CloudCog,
  Database,
  LayoutTemplate,
  Network,
  ServerCog,
} from "lucide-react";
import { skillGroups } from "@/lib/portfolio-data";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

type IconComponent = ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;

const iconMap: Record<(typeof skillGroups)[number]["icon"], IconComponent> = {
  layout: LayoutTemplate,
  server: ServerCog,
  network: Network,
  brain: BrainCircuit,
  database: Database,
  cloud: CloudCog,
  activity: Activity,
};

export function SkillsSection() {
  return (
    <section id="skills" className="section-pad relative overflow-hidden">
      <div className="absolute -left-40 top-24 size-96 rounded-full bg-cyan-400/6 blur-[130px]" aria-hidden="true" />
      <div className="container-shell relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Engineering capabilities"
            title="A stack shaped by real platform work."
            copy="The tools I use across product interfaces, backend services, distributed workflows, data, local models, environments, and observability."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = iconMap[group.icon];
            return (
              <Reveal key={group.title} delay={index * 0.045} className="h-full">
                <article className="skill-card group h-full rounded-3xl border border-white/10 bg-white/[0.032] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.052] sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl border border-cyan-300/15 bg-cyan-300/8 text-cyan-200 transition group-hover:border-cyan-300/30 group-hover:bg-cyan-300/12">
                      <Icon size={21} aria-hidden={true} />
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] uppercase tracking-[0.12em] text-slate-400">
                      {group.level}
                    </span>
                  </div>
                  <h3 className="font-display mt-6 text-lg font-semibold text-white">{group.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{group.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="rounded-lg border border-white/[0.075] bg-[#07101a]/75 px-2.5 py-1.5 text-xs text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

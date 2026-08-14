import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Boxes, Code2, ServerCog } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const focusAreas = [
  {
    icon: Code2,
    title: "Product",
    copy: "Built the complete QuantiFore frontend and analytical experience.",
  },
  {
    icon: ServerCog,
    title: "Core systems",
    copy: "Built the SML workflow, query, entity, and real-time services.",
  },
  {
    icon: Boxes,
    title: "Platform",
    copy: "Built signal services, environments, LLM setup, and observability.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div
        className="absolute right-[-14rem] top-20 size-[36rem] rounded-full bg-violet-500/7 blur-[150px]"
        aria-hidden="true"
      />

      <div className="container-shell relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="I build the full path behind complex software."
            copy="From the product interface and core backend workflows to local models, environments, and production troubleshooting."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
          <Reveal className="relative" delay={0.04}>
            <div className="profile-frame relative mx-auto max-w-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-3 shadow-[0_45px_120px_-55px_rgba(34,211,238,0.4)]">
              <div className="profile-grid absolute inset-0" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#09111b]">
                <Image
                  src="/profile.webp"
                  alt="Adil Jaseem"
                  width={828}
                  height={828}
                  className="aspect-square w-full object-cover transition duration-700 hover:scale-[1.025]"
                  sizes="(max-width: 1024px) 88vw, 34vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#05070b] via-[#05070b]/72 to-transparent p-6 pt-24">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-200/75">
                    Trivandrum, Kerala, India
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    Full Stack Developer at Numenor
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.08}>
              <p className="max-w-3xl text-pretty text-xl leading-9 text-slate-200 sm:text-2xl sm:leading-10">
                My strongest work sits where product engineering, distributed services, and platform operations meet.
              </p>
              <p className="mt-5 max-w-3xl text-pretty text-base leading-8 text-slate-400">
                I started with React, Node.js, and GraphQL products. Today, I own major QuantiFore surfaces from the complete frontend and core SML services to signal intelligence, self-hosted LLM integrations, Docker environments, observability, and Git workflows.
              </p>
              <Link
                href="/resume"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                View the updated résumé
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </Reveal>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {focusAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <Reveal key={area.title} delay={0.1 + index * 0.05} className="h-full">
                    <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.045] sm:p-5">
                      <span className="grid size-10 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-300/8 text-cyan-200">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <h3 className="font-display mt-4 text-sm font-semibold text-white">{area.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{area.copy}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

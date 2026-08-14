import { BriefcaseBusiness, CircleDot } from "lucide-react";
import { experience } from "@/lib/portfolio-data";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-pad relative bg-white/[0.012]">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Built across product, services, and platform operations."
            copy="My current role covers end-to-end QuantiFore engineering. Earlier work established the React, Node.js, GraphQL, and AI-product foundation behind it."
          />
        </Reveal>

        <div className="mt-14 grid gap-5">
          {experience.map((item, index) => (
            <Reveal key={`${item.company}-${item.period}`} delay={index * 0.06}>
              <article
                className={`group relative overflow-hidden rounded-3xl border p-6 transition duration-300 sm:p-8 lg:grid lg:grid-cols-[0.31fr_0.69fr] lg:gap-12 ${
                  item.current
                    ? "border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.045] via-[#09111b]/88 to-violet-300/[0.025]"
                    : "border-white/10 bg-[#09111b]/80 hover:border-white/20"
                }`}
              >
                <div
                  className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-cyan-300/70 to-transparent opacity-0 transition group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-cyan-200">
                      <BriefcaseBusiness size={18} aria-hidden="true" />
                    </span>
                    {item.current ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/8 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.13em] text-emerald-100">
                        <CircleDot size={11} aria-hidden="true" />
                        Current role
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">{item.period}</p>
                  <h3 className="font-display mt-3 text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl">{item.role}</h3>
                  <p className="mt-2 text-sm font-medium text-cyan-200">{item.company}</p>
                  <p className="mt-2 text-sm text-slate-500">{item.location}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.scope.map((scope) => (
                      <span
                        key={scope}
                        className="rounded-lg border border-white/[0.08] bg-black/15 px-2.5 py-1.5 text-[10px] text-slate-400"
                      >
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 lg:mt-0">
                  <p className="text-base leading-8 text-slate-300">{item.summary}</p>
                  <ul
                    className={`mt-6 grid gap-x-8 gap-y-3 ${item.current ? "xl:grid-cols-2" : ""}`}
                    role="list"
                  >
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-sm leading-7 text-slate-400">
                        <span className="mt-3 size-1.5 shrink-0 rounded-full bg-cyan-300/75" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

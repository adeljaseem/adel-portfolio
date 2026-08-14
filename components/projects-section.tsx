import Link from "next/link";
import { ArrowUpRight, LockKeyhole, Workflow } from "lucide-react";
import { ProjectMediaGallery } from "@/components/project-media-gallery";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/portfolio-data";

const ownershipSummary = [
  {
    label: "Built",
    value:
      "Complete frontend, SML Coordinator, SML Orchestrator, Query Parser, Entity Resolution, WebSocket Gateway, Signal Scraper, and Signal Scheduler",
  },
  {
    label: "Platform",
    value:
      "Local LLM serving, Docker environments, bootstrap automation, Grafana/Loki/Alloy, and Git workflows",
  },
  {
    label: "Integrated",
    value:
      "ETL, CFRI, ATI, blueprint, dashboard, simulation, identity, gateway, CDC, and data-service workflows",
  },
] as const;

const projectList = [
  {
    title: "QuantiFore",
    category: "Enterprise intelligence and simulation platform",
    period: "2025 - Present",
    role: "Full Stack and Platform Engineering",
    summary:
      "Built the complete frontend, core SML workflow, real-time services, signal-intelligence pipeline, local LLM integrations, observability, and multi-environment platform tooling.",
    tags: ["React", "TypeScript", "Python", "FastAPI", "RabbitMQ", "Docker"],
    href: "/work/quantifore-platform",
  },
  {
    title: "Newsraven",
    category: "AI-assisted media intelligence",
    period: "2022 - 2024",
    role: "Full Stack Product Development",
    summary:
      "Worked across React interfaces, Node.js and GraphQL services, scheduled workflows, semantic search, vector retrieval, and OpenAI, Gemini, and Claude integrations.",
    tags: ["React", "Node.js", "GraphQL", "PostgreSQL", "Pinecone", "AI APIs"],
    href: "/work/newsraven",
  },
  {
    title: "Clinasyst",
    category: "Clinical product interfaces",
    period: "2022 - 2024",
    role: "Frontend Engineering",
    summary:
      "Developed reusable React components, dynamic workflow states, responsive interfaces, validation behavior, and end-to-end product testing.",
    tags: ["React", "JavaScript", "Responsive UI", "Testing"],
    href: "/work/earlier-product-experience",
  },
  {
    title: "Responseloop",
    category: "Location and account workflows",
    period: "2022 - 2024",
    role: "Frontend and Maps Integration",
    summary:
      "Implemented Google Maps-based location flows and improved login, signup, logout, account, and navigation experiences in React.",
    tags: ["React", "Google Maps", "Authentication UX", "JavaScript"],
    href: "/work/earlier-product-experience",
  },
] as const;

export function ProjectsSection() {
  const featured = projects.find((project) => project.featured) ?? projects[0]!;

  return (
    <section id="work" className="section-pad relative overflow-hidden">
      <div
        className="absolute -left-48 top-1/3 size-[34rem] rounded-full bg-cyan-400/6 blur-[150px]"
        aria-hidden="true"
      />

      <div className="container-shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Selected work"
              title="QuantiFore, from product interface to platform operations."
              copy="The primary case study presents my end-to-end contribution across the frontend, backend workflows, real-time services, local LLM operations, observability, and platform environments."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-sm rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-7 text-slate-400">
              <div className="flex items-center gap-2 font-medium text-slate-200">
                <LockKeyhole size={15} className="text-cyan-200" aria-hidden="true" />
                Public-safe case study
              </div>
              <p className="mt-2">
                Internal addresses, credentials, client data, prompts, and proprietary algorithms are excluded.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.04} className="mt-14">
          <article className="featured-project-card relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.018] p-4 shadow-[0_45px_120px_-55px_rgba(34,211,238,0.3)] sm:p-6 lg:p-8">
            <div className="project-grid absolute inset-0 opacity-45" aria-hidden="true" />
            <div className="relative grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
              <div className="p-2 sm:p-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-cyan-100">
                    Primary project
                  </span>
                  <span className="text-xs text-slate-500">{featured.period}</span>
                </div>

                <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-200/75">
                  {featured.eyebrow}
                </p>
                <h3 className="font-display mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                  {featured.shortTitle}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">{featured.summary}</p>

                <div className="mt-7 grid gap-3">
                  {ownershipSummary.map((item) => (
                    <div
                      key={item.label}
                      className="flex gap-3 rounded-2xl border border-white/10 bg-[#07101a]/62 p-4"
                    >
                      <span className="mt-0.5 shrink-0 rounded-lg border border-cyan-300/15 bg-cyan-300/8 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-cyan-100">
                        {item.label}
                      </span>
                      <p className="text-sm leading-6 text-slate-400">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {featured.tags.slice(0, 10).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/[0.075] bg-[#07101a]/75 px-2.5 py-1.5 text-[11px] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={`/work/${featured.slug}`} className="button-primary mt-8">
                  Explore the full platform case study
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-[#05090f]/45 p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3 px-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Workflow size={15} className="text-cyan-200" aria-hidden="true" />
                    Project image slots
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-slate-600">
                    Add sanitized captures
                  </span>
                </div>
                <ProjectMediaGallery items={featured.media} compact />
              </div>
            </div>
          </article>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-4 border-t border-white/8 pt-12">
          <div>
            <p className="eyebrow">Projects</p>
            <h3 className="font-display mt-4 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
              Projects I&apos;ve worked on.
            </h3>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-500">
            A concise view of the platforms and products I contributed to across full-stack, AI, frontend, and platform engineering.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.018]">
          {projectList.map((project, index) => (
            <Reveal key={project.title} delay={Math.min(index * 0.05, 0.15)} y={18}>
              <Link
                href={project.href}
                aria-label={`View ${project.title} project details`}
                className={`group grid gap-5 p-5 transition duration-300 hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300 sm:p-6 lg:grid-cols-[52px_minmax(0,1fr)_auto] lg:items-center lg:gap-7 ${
                  index !== projectList.length - 1 ? "border-b border-white/8" : ""
                }`}
              >
                <span className="font-mono text-[10px] tracking-[0.18em] text-cyan-200/55">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h4 className="font-display text-xl font-semibold tracking-[-0.025em] text-white transition group-hover:text-cyan-100 sm:text-2xl">
                      {project.title}
                    </h4>
                    <span className="text-xs text-slate-600">{project.period}</span>
                  </div>

                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-cyan-200/70">
                    {project.category}
                  </p>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">{project.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-lg border border-cyan-300/12 bg-cyan-300/6 px-2.5 py-1 text-[10px] text-cyan-100/80">
                      {project.role}
                    </span>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/[0.07] bg-[#07101a]/65 px-2.5 py-1 text-[10px] text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition group-hover:text-white">
                  View project
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <a
            href="https://github.com/adeljaseem"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            View public repositories on GitHub
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

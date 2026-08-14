import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers3,
  LockKeyhole,
  Route,
  ShieldCheck,
} from "lucide-react";
import { ProjectMediaGallery } from "@/components/project-media-gallery";
import { ProjectVisual } from "@/components/project-visual";
import { getProject, projects } from "@/lib/portfolio-data";
import { siteConfig } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

type Ownership = "Built" | "Co-developed" | "Integrated";

const ownershipStyles: Record<Ownership, string> = {
  Built: "border-emerald-300/20 bg-emerald-300/8 text-emerald-100",
  "Co-developed": "border-cyan-300/20 bg-cyan-300/8 text-cyan-100",
  Integrated: "border-violet-300/20 bg-violet-300/8 text-violet-100",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: project.shortTitle,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/work/${project.slug}`,
      title: `${project.title} — ${siteConfig.name}`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const projectIndex = projects.findIndex((entry) => entry.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length]!;
  const metricGrid = project.metrics.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3";

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <header className="container-shell">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to selected work
        </Link>

        <div className="mt-10 grid gap-10 xl:grid-cols-[1.08fr_0.92fr] xl:items-end">
          <div>
            <p className="eyebrow">{project.eyebrow}</p>
            <h1 className="font-display mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mt-7 max-w-3xl text-pretty text-lg leading-9 text-slate-300">
              {project.summary}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span>{project.period}</span>
              <span className="hidden size-1 self-center rounded-full bg-slate-700 sm:block" aria-hidden="true" />
              <span>{project.role}</span>
            </div>
          </div>

          <div className={`grid ${metricGrid} gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10`}>
            {project.metrics.map((metric) => (
              <div key={metric.label} className="stat-cell bg-[#07101a] px-4 py-5 text-center sm:px-5">
                <span className="font-display block text-base font-semibold tracking-tight text-white sm:text-lg">
                  {metric.value}
                </span>
                <span className="mt-1 block text-[10px] leading-4 text-slate-500">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="container-shell mt-14">
        <ProjectVisual kind={project.kind} />
      </div>

      <div className="container-shell mt-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Project visuals</p>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
              Selected interface views.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-500">
            The placeholders preserve confidentiality until sanitized product screenshots are ready for publication.
          </p>
        </div>
        <ProjectMediaGallery items={project.media} />
      </div>

      <div className="container-shell mt-16 grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:gap-14">
        <aside className="xl:sticky xl:top-28 xl:self-start">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200/70">
              Technology surface
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-lg border border-white/10 bg-[#07101a]/75 px-2.5 py-1.5 text-xs text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {project.confidentiality ? (
            <div className="mt-4 rounded-3xl border border-amber-200/10 bg-amber-200/[0.035] p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-amber-100">
                <LockKeyhole size={16} aria-hidden="true" />
                Confidentiality note
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {project.confidentiality}
              </p>
            </div>
          ) : null}
        </aside>

        <div className="case-prose min-w-0">
          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <p className="eyebrow">Context</p>
            <h2 className="font-display mt-4!">Overview</h2>
            <p>{project.overview}</p>
          </section>

          <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-violet-300/15 bg-violet-300/8 text-violet-200">
                <Route size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">Problem framing</p>
                <h2 className="font-display mt-1!">The challenge</h2>
              </div>
            </div>
            <p className="mt-5">{project.challenge}</p>
          </section>

          <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-300/8 text-cyan-200">
                <Layers3 size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">Ownership</p>
                <h2 className="font-display mt-1!">What I contributed</h2>
              </div>
            </div>
            <ul>
              {project.contributions.map((contribution) => (
                <li key={contribution}>{contribution}</li>
              ))}
            </ul>
          </section>

          <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <p className="eyebrow">Contribution map</p>
            <h2 className="font-display mt-4!">Direct ownership and integration boundaries</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {project.focusAreas.map((area) => (
                <article key={area.title} className="rounded-2xl border border-white/10 bg-[#07101a]/72 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-display text-base font-semibold text-white">{area.title}</h3>
                    <span className={`rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] ${ownershipStyles[area.ownership]}`}>
                      {area.ownership}
                    </span>
                  </div>
                  <p className="mt-3! text-sm! leading-7!">{area.detail}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {area.technologies.map((technology) => (
                      <span key={technology} className="rounded-md border border-white/8 bg-black/15 px-2 py-1 text-[10px] text-slate-400">
                        {technology}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <p className="eyebrow">System path</p>
            <h2 className="font-display mt-4!">Architecture at a glance</h2>
            <div className="mt-7 grid gap-3">
              {project.architecture.map((step, stepIndex) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#07101a]/72 p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-300/7 font-mono text-[10px] text-cyan-200">
                    {String(stepIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-6 text-slate-300">{step}</span>
                  {stepIndex < project.architecture.length - 1 ? (
                    <ArrowRight size={14} className="ml-auto hidden text-slate-700 sm:block" aria-hidden="true" />
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-emerald-300/15 bg-emerald-300/8 text-emerald-200">
                <ShieldCheck size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">Trade-offs</p>
                <h2 className="font-display mt-1!">Engineering decisions</h2>
              </div>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {project.decisions.map((decision) => (
                <div key={decision.title} className="rounded-2xl border border-white/10 bg-[#07101a]/72 p-5">
                  <h3 className="font-display text-base font-semibold text-white">{decision.title}</h3>
                  <p className="mt-3! text-sm! leading-7!">{decision.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-cyan-300/10 bg-gradient-to-br from-cyan-300/[0.045] to-violet-300/[0.035] p-6 sm:p-8">
            <p className="eyebrow">Outcome</p>
            <h2 className="font-display mt-4!">Impact</h2>
            <ul>
              {project.impact.map((result) => (
                <li key={result} className="flex gap-3 pl-0! before:hidden!">
                  <CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-200" aria-hidden="true" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="container-shell mt-20 border-t border-white/10 pt-10">
        <Link
          href={`/work/${nextProject.slug}`}
          className="group flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-cyan-300/20 hover:bg-white/[0.045] sm:flex-row sm:items-end sm:justify-between sm:p-8"
        >
          <span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Next case study</span>
            <span className="font-display mt-3 block text-2xl font-semibold tracking-tight text-white">
              {nextProject.shortTitle}
            </span>
            <span className="mt-2 block max-w-2xl text-sm leading-7 text-slate-400">
              {nextProject.summary}
            </span>
          </span>
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/8 text-cyan-200 transition group-hover:translate-x-1">
            <ArrowRight size={20} aria-hidden="true" />
          </span>
        </Link>
      </div>
    </article>
  );
}

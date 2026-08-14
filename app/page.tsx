import Link from "next/link";
import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
import { AboutSection } from "@/components/about-section";
import { ArchitectureSection } from "@/components/architecture-section";
import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { HeroSection } from "@/components/hero-section";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SkillsSection } from "@/components/skills-section";

type ProjectEntry = {
  title: string;
  category: string;
  period: string;
  role: string;
  summary: string;
  tags: readonly string[];
  href: string;
  cta: string;
  primary?: boolean;
  external?: boolean;
};

const projectList: readonly ProjectEntry[] = [
  {
    title: "QuantiFore",
    category: "Enterprise intelligence and system-dynamics platform",
    period: "2025 - Present",
    role: "Full Stack and Platform Engineering",
    summary:
      "My primary project. I built the complete React and TypeScript frontend and major backend and platform services spanning the SML workflow, query parsing, entity resolution, real-time WebSocket delivery, signal intelligence, local LLM serving, observability, Docker environments, bootstrap automation, and Git workflows.",
    tags: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "gRPC",
      "RabbitMQ",
      "PostgreSQL",
      "Docker",
      "LLM Infrastructure",
    ],
    href: "/work/quantifore-platform",
    cta: "View primary project",
    primary: true,
  },
  {
    title: "Spendwise",
    category: "Personal finance and budgeting PWA",
    period: "Side project",
    role: "Independent Full Stack Development",
    summary:
      "A mobile-first expense and budget tracker with daily, monthly, and yearly views, budget allocations, debt and recurring-expense management, category insights, charts, search, CSV export, Supabase authentication, notification settings, themes, and installable PWA behavior.",
    tags: [
      "React 19",
      "Vite",
      "Supabase",
      "Recharts",
      "Tailwind CSS",
      "PWA",
      "Netlify",
    ],
    href: "https://spendws.netlify.app/login",
    cta: "Open live app",
    external: true,
  },
  {
    title: "Newsraven",
    category: "AI-assisted media intelligence product",
    period: "2022 - 2024",
    role: "Full Stack Product Development",
    summary:
      "Developed React interfaces, Node.js and GraphQL services, scheduled workflows, AI-assisted summaries and content features, semantic search, vector retrieval, and integrations with OpenAI, Gemini, and Claude.",
    tags: ["React", "Node.js", "GraphQL", "PostgreSQL", "Pinecone", "AI APIs"],
    href: "/work/newsraven",
    cta: "View project",
  },
  {
    title: "Clinasyst",
    category: "Clinical product interfaces",
    period: "2022 - 2024",
    role: "Frontend Engineering",
    summary:
      "Built reusable React components, responsive clinical-product interfaces, interactive workflow states, validation behavior, and tested user-facing functionality with the wider product team.",
    tags: ["React", "JavaScript", "Responsive UI", "Component Architecture", "Testing"],
    href: "/work/earlier-product-experience",
    cta: "View project",
  },
  {
    title: "Responseloop",
    category: "Location and account workflows",
    period: "2022 - 2024",
    role: "Frontend and Maps Integration",
    summary:
      "Implemented Google Maps-based location flows and improved authentication, account, navigation, and user-experience interactions in a React application.",
    tags: ["React", "Google Maps", "Authentication UX", "JavaScript"],
    href: "/work/earlier-product-experience",
    cta: "View project",
  },
] as const;

function ProjectRow({ project, index }: { project: ProjectEntry; index: number }) {
  const rowClassName = `group relative grid gap-5 overflow-hidden p-5 transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300 sm:p-6 lg:grid-cols-[72px_minmax(0,1fr)_auto] lg:items-center lg:gap-7 ${
    project.primary
      ? "bg-gradient-to-r from-cyan-300/[0.065] via-white/[0.025] to-transparent hover:from-cyan-300/[0.1]"
      : "hover:bg-white/[0.035]"
  }`;

  const content = (
    <>
      <div className="flex items-start justify-between gap-4 lg:block">
        <span
          className={`font-mono text-[10px] tracking-[0.18em] transition-colors duration-300 ${
            project.primary
              ? "text-cyan-200"
              : "text-cyan-200/50 group-hover:text-cyan-200"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {project.primary ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-cyan-100 lg:mt-5">
            <Star size={10} aria-hidden="true" />
            Primary project
          </span>
        ) : null}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-display text-xl font-semibold tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-cyan-100 sm:text-2xl">
            {project.title}
          </h3>
          <span className="text-xs text-slate-600">{project.period}</span>
        </div>

        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em] text-cyan-200/70">
          {project.category}
        </p>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-lg border border-cyan-300/12 bg-cyan-300/6 px-2.5 py-1 text-[10px] text-cyan-100/85">
            {project.role}
          </span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-white/[0.07] bg-[#07101a]/65 px-2.5 py-1 text-[10px] text-slate-400 transition-colors duration-300 group-hover:border-white/10 group-hover:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-slate-400 transition-colors duration-300 group-hover:text-white">
        {project.cta}
        {project.external ? (
          <ExternalLink
            size={15}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        ) : (
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        )}
      </span>
    </>
  );

  if (project.external) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title} live application`}
        className={rowClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={project.href}
      aria-label={`View ${project.title} project details`}
      className={rowClassName}
    >
      {content}
    </Link>
  );
}

function UnifiedProjectsSection() {
  return (
    <section id="work" className="section-pad relative overflow-hidden">
      <div
        className="absolute -left-48 top-1/3 size-[34rem] rounded-full bg-cyan-400/6 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-52 bottom-0 size-[30rem] rounded-full bg-violet-500/5 blur-[160px]"
        aria-hidden="true"
      />

      <div className="container-shell relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Projects I have worked on."
            copy="A simple collection of my primary enterprise platform work, earlier product experience, and independent side projects."
          />
        </Reveal>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.018] shadow-[0_32px_100px_-70px_rgba(34,211,238,0.45)]">
          {projectList.map((project, index) => (
            <Reveal
              key={project.title}
              delay={Math.min(index * 0.05, 0.16)}
              y={16}
              className={
                index !== projectList.length - 1
                  ? "border-b border-white/8"
                  : ""
              }
            >
              <ProjectRow project={project} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-9">
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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ArchitectureSection />
      <UnifiedProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}

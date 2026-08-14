"use client";

import { useMemo, useState, type ComponentType } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Activity,
  BrainCircuit,
  Boxes,
  Container,
  Database,
  Gauge,
  Network,
  Radio,
  Route,
  ScanSearch,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

type Ownership = "Built" | "Latest build" | "Integrated";

type PlatformNode = {
  id: string;
  label: string;
  shortLabel: string;
  eyebrow: string;
  ownership: Ownership;
  copy: string;
  work: string;
  technologies: string[];
  icon: ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
};

const platformNodes: PlatformNode[] = [
  {
    id: "product",
    label: "Complete analytical product frontend",
    shortLabel: "Product frontend",
    eyebrow: "Client layer",
    ownership: "Built",
    copy: "Authentication, dashboards, monitoring, signals, alerts, simulation, models, administration, settings, maps, graphs, and real-time states.",
    work: "I built the complete React and TypeScript product surface and its reusable interaction patterns.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Mapbox GL", "D3.js"],
    icon: Gauge,
  },
  {
    id: "sml",
    label: "SML Coordinator & Orchestrator",
    shortLabel: "Core SML workflow",
    eyebrow: "Coordination layer",
    ownership: "Built",
    copy: "Immediate job acceptance, organization context, RabbitMQ dispatch, exact and semantic lookup, fast and slow paths, state, and completion handling.",
    work: "I designed and implemented the coordinator and orchestrator services behind Stock or Model Lookup.",
    technologies: ["Python", "gRPC", "RabbitMQ", "PostgreSQL", "Redis", "Protocol Buffers"],
    icon: Route,
  },
  {
    id: "query",
    label: "Query Parser & Entity Resolution",
    shortLabel: "Language + entities",
    eyebrow: "Understanding layer",
    ownership: "Built",
    copy: "Intent, anchors, drivers, semantic tokens, embeddings, aliases, canonical names, geography, and contextual disambiguation.",
    work: "I built the services that turn user language into structured, standardized model context.",
    technologies: ["Sentence Transformers", "Ollama", "Wikidata", "pgvector", "Pydantic"],
    icon: ScanSearch,
  },
  {
    id: "realtime",
    label: "WebSocket Gateway & real-time state",
    shortLabel: "Real-time delivery",
    eyebrow: "Delivery layer",
    ownership: "Built",
    copy: "Authenticated delivery of SML completion, job progress, alerts, and activity events from RabbitMQ workflows into the interface.",
    work: "I built the WebSocket gateway and connected backend events to persistent frontend states.",
    technologies: ["WebSockets", "RabbitMQ", "FastAPI", "JWT", "Redis"],
    icon: Radio,
  },
  {
    id: "signals",
    label: "Signal Scheduler & Signal Scraper",
    shortLabel: "Signal intelligence",
    eyebrow: "Latest contribution",
    ownership: "Latest build",
    copy: "Distributed scheduling, trusted search, batched screening, crawling, grounded extraction, evidence checks, geocoding, deduplication, and alerts.",
    work: "I architected and developed the latest signal-intelligence service family end to end.",
    technologies: ["Python", "SearXNG", "Crawl4AI", "MCP", "asyncpg", "aio-pika"],
    icon: BrainCircuit,
  },
  {
    id: "operations",
    label: "Environments, LLM serving & observability",
    shortLabel: "Platform operations",
    eyebrow: "Operating layer",
    ownership: "Built",
    copy: "Development, staging, and production workflows, bootstrap automation, shared models, centralized logs, health checks, and Git integration.",
    work: "I built and maintained much of the practical platform layer used to run and troubleshoot QuantiFore.",
    technologies: ["Docker Compose", "Bash", "llama.cpp", "Ollama", "Grafana", "Loki", "Alloy", "Git"],
    icon: Container,
  },
  {
    id: "integration",
    label: "Data, simulation & specialist service integration",
    shortLabel: "Domain integration",
    eyebrow: "Specialist layer",
    ownership: "Integrated",
    copy: "ETL, CFRI, ATI, blueprint, dashboard, simulation, identity, gateway, CDC, graph, time-series, relational, and cache surfaces.",
    work: "I integrated, debugged, extended, and validated end-to-end flows while preserving specialist ownership boundaries.",
    technologies: ["ETL", "CFRI", "ATI", "Simulation", "TimescaleDB", "Apache AGE", "Debezium"],
    icon: Database,
  },
];

const ownershipStyles: Record<Ownership, string> = {
  Built: "border-emerald-300/20 bg-emerald-300/8 text-emerald-100",
  "Latest build": "border-cyan-300/25 bg-cyan-300/10 text-cyan-50",
  Integrated: "border-violet-300/20 bg-violet-300/8 text-violet-100",
};

export function ArchitectureSection() {
  const [selectedId, setSelectedId] = useState("product");
  const reduceMotion = useReducedMotion();
  const selected = useMemo(
    () => platformNodes.find((node) => node.id === selectedId) ?? platformNodes[0]!,
    [selectedId],
  );
  const SelectedIcon = selected.icon;

  return (
    <section id="architecture" className="section-pad relative overflow-hidden border-y border-white/[0.065] bg-white/[0.016]">
      <div
        className="absolute right-[-12rem] top-24 size-[34rem] rounded-full bg-violet-500/7 blur-[150px]"
        aria-hidden="true"
      />
      <div className="container-shell relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="QuantiFore contribution map"
            title="One platform, built across every layer."
            copy="Direct ownership is separated from the specialist services I integrated with, debugged, and supported."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="min-w-0">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07101a]/82 p-4 shadow-2xl shadow-black/20 sm:p-7">
              <div className="architecture-grid" aria-hidden="true" />

              <div className="relative mb-6 hidden h-1 overflow-hidden rounded-full bg-white/5 md:block" aria-hidden="true">
                <motion.div
                  className="absolute inset-y-0 w-28 rounded-full bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent blur-[1px]"
                  animate={reduceMotion ? undefined : { x: ["-120%", "780%"] }}
                  transition={{ duration: 5.6, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <div className="relative grid gap-3 md:grid-cols-2">
                {platformNodes.map((node, index) => {
                  const Icon = node.icon;
                  const active = node.id === selected.id;

                  return (
                    <motion.button
                      key={node.id}
                      type="button"
                      onClick={() => setSelectedId(node.id)}
                      whileHover={reduceMotion ? undefined : { y: -3, rotateX: 1.5, rotateY: index % 2 ? -1.5 : 1.5 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                      className={`platform-node group relative overflow-hidden rounded-2xl border p-4 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:p-5 ${
                        active
                          ? "border-cyan-300/25 bg-cyan-300/[0.075]"
                          : "border-white/10 bg-[#09131f]/86 hover:border-white/20 hover:bg-white/[0.05]"
                      }`}
                      aria-pressed={active}
                    >
                      {active ? (
                        <motion.span
                          layoutId="platform-node-active"
                          className="absolute inset-0 bg-gradient-to-br from-cyan-300/[0.065] via-transparent to-violet-300/[0.04]"
                          transition={{ type: "spring", stiffness: 290, damping: 28 }}
                          aria-hidden="true"
                        />
                      ) : null}

                      <span className="relative flex items-start gap-4">
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-black/15 text-cyan-200">
                          <Icon size={20} aria-hidden={true} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-slate-500">
                            {String(index + 1).padStart(2, "0")} · {node.eyebrow}
                          </span>
                          <span className="mt-1.5 block text-sm font-semibold text-white sm:text-base">
                            {node.shortLabel}
                          </span>
                          <span className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] ${ownershipStyles[node.ownership]}`}>
                            {node.ownership}
                          </span>
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="relative mt-5 flex items-center gap-3 rounded-2xl border border-dashed border-white/10 bg-black/10 px-4 py-3 text-xs leading-6 text-slate-500">
                <Network size={16} className="shrink-0 text-cyan-200/70" aria-hidden="true" />
                Product UI → core services → asynchronous workflows → real-time delivery → platform operations.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <div className="sticky top-24 flex min-h-[500px] flex-col rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.055] to-white/[0.02] p-6 shadow-2xl shadow-black/20 sm:p-8">
              <motion.div
                key={selected.id}
                initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.36 }}
                className="flex h-full flex-1 flex-col"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-14 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/8 text-cyan-100">
                    <SelectedIcon size={24} aria-hidden={true} />
                  </span>
                  <span className={`rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.12em] ${ownershipStyles[selected.ownership]}`}>
                    {selected.ownership}
                  </span>
                </div>

                <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.17em] text-slate-500">{selected.eyebrow}</p>
                <h3 className="font-display mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">{selected.label}</h3>
                <p className="mt-5 text-base leading-8 text-slate-300">{selected.copy}</p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-[#05090f]/55 p-4">
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-slate-500">
                    <Boxes size={14} className="text-cyan-200/70" aria-hidden="true" />
                    My contribution
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{selected.work}</p>
                </div>

                <div className="mt-7">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Technology surface</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selected.technologies.map((technology) => (
                      <span key={technology} className="rounded-lg border border-white/10 bg-[#07101a]/70 px-3 py-2 text-xs text-slate-300">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-9">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#05090f]/55 px-4 py-3 text-[9px] uppercase tracking-[0.14em] text-slate-500">
                    <span>Contribution path</span>
                    <span className="inline-flex items-center gap-2 text-emerald-200/80">
                      <Activity size={12} aria-hidden="true" />
                      Active
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

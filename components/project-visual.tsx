"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Activity,
  Boxes,
  Container,
  Database,
  FileSearch,
  GitBranch,
  Network,
  Radio,
  ScanSearch,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { ProjectKind } from "@/lib/portfolio-data";

type ProjectVisualProps = { kind: ProjectKind; compact?: boolean };
type MotionPreference = { reduceMotion: boolean };

const platformNodes = [
  { label: "React UI", x: "12%", y: "22%", tone: "cyan" },
  { label: "Gateway", x: "40%", y: "13%", tone: "violet" },
  { label: "SML Core", x: "70%", y: "27%", tone: "emerald" },
  { label: "RabbitMQ", x: "22%", y: "66%", tone: "violet" },
  { label: "Data stores", x: "52%", y: "76%", tone: "cyan" },
  { label: "WebSockets", x: "80%", y: "66%", tone: "emerald" },
] as const;

const toneClass = {
  cyan: "bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.65)]",
  violet: "bg-violet-300 shadow-[0_0_14px_rgba(167,139,250,0.6)]",
  emerald: "bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.6)]",
} as const;

function PlatformVisual({ reduceMotion }: MotionPreference) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="project-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="platform-line-v4" x1="0" x2="1">
            <stop offset="0" stopColor="#67e8f9" stopOpacity="0.16" />
            <stop offset="0.52" stopColor="#a78bfa" stopOpacity="0.5" />
            <stop offset="1" stopColor="#6ee7b7" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        <path d="M16 24 L43 16 L72 29 L82 67 L53 78 L23 67 Z" fill="none" stroke="url(#platform-line-v4)" strokeWidth="0.75" strokeDasharray="2 2" />
        <path d="M16 24 L53 78 M43 16 L23 67 M72 29 L23 67 M43 16 L82 67" fill="none" stroke="url(#platform-line-v4)" strokeWidth="0.46" />
      </svg>

      <motion.div
        className="absolute left-[9%] top-[18%] size-2 rounded-full bg-white shadow-[0_0_18px_rgba(165,243,252,0.9)]"
        animate={
          reduceMotion
            ? undefined
            : {
                left: ["9%", "39%", "68%", "79%", "50%", "20%", "9%"],
                top: ["18%", "9%", "23%", "61%", "72%", "61%", "18%"],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      {platformNodes.map((node, index) => (
        <motion.div
          key={node.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-[#07101a]/88 px-3 py-2 shadow-xl shadow-black/25 backdrop-blur"
          style={{ left: node.x, top: node.y }}
          animate={reduceMotion ? undefined : { y: [0, index % 2 === 0 ? -4 : 4, 0] }}
          transition={{ duration: 4.2 + index * 0.25, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="flex items-center gap-2 whitespace-nowrap text-[10px] font-medium text-slate-200">
            <span className={`size-1.5 rounded-full ${toneClass[node.tone]}`} />
            {node.label}
          </span>
        </motion.div>
      ))}

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-[#05090f]/74 px-3 py-2.5 backdrop-blur">
        <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-slate-500">
          <Network size={11} className="text-cyan-200" aria-hidden="true" />
          End-to-end platform
        </span>
        <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-emerald-200/80">
          <span className="size-1.5 rounded-full bg-emerald-300" />
          Connected
        </span>
      </div>
    </div>
  );
}

function WorkflowVisual({ reduceMotion }: MotionPreference) {
  const nodes = [
    { label: "Coordinator", left: "8%", top: "18%", icon: Workflow },
    { label: "Orchestrator", left: "37%", top: "42%", icon: Network },
    { label: "Query + Entity", left: "68%", top: "18%", icon: ScanSearch },
    { label: "WebSocket", left: "69%", top: "69%", icon: Radio },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="project-grid absolute inset-0 opacity-55" aria-hidden="true" />
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M18 28 C30 27, 34 42, 44 48 C55 55, 64 32, 75 27 M48 52 C59 58, 63 70, 76 75" fill="none" stroke="rgba(103,232,249,.35)" strokeWidth="0.8" strokeDasharray="2 2" />
      </svg>
      <motion.span
        className="absolute size-2 rounded-full bg-cyan-100 shadow-[0_0_18px_rgba(103,232,249,.95)]"
        animate={reduceMotion ? undefined : { left: ["14%", "43%", "73%", "45%", "74%"], top: ["24%", "46%", "24%", "49%", "73%"] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      {nodes.map((node, index) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.label}
            className="absolute rounded-2xl border border-white/10 bg-[#08121d]/90 p-3 shadow-xl shadow-black/25 backdrop-blur"
            style={{ left: node.left, top: node.top }}
            animate={reduceMotion ? undefined : { y: [0, index % 2 ? 4 : -4, 0] }}
            transition={{ duration: 4.5 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="flex items-center gap-2 whitespace-nowrap text-[9px] font-medium text-white">
              <span className="grid size-7 place-items-center rounded-lg border border-cyan-300/15 bg-cyan-300/8 text-cyan-200">
                <Icon size={13} aria-hidden="true" />
              </span>
              {node.label}
            </span>
          </motion.div>
        );
      })}
      <div className="absolute bottom-4 left-4 rounded-xl border border-emerald-300/15 bg-emerald-300/7 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.13em] text-emerald-100">
        Query → model → ready
      </div>
    </div>
  );
}

function SignalVisual({ reduceMotion }: MotionPreference) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_52%_44%,rgba(34,211,238,.13),transparent_34%)]">
      <div className="absolute left-1/2 top-[45%] size-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />
      <div className="absolute left-1/2 top-[45%] size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15" />
      <div className="absolute left-1/2 top-[45%] size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20" />
      <motion.div
        className="absolute left-1/2 top-[45%] h-px w-24 origin-left bg-gradient-to-r from-cyan-200/80 to-transparent"
        animate={reduceMotion ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      {[{ x: "23%", y: "28%" }, { x: "70%", y: "25%" }, { x: "61%", y: "63%" }, { x: "29%", y: "65%" }].map((point, index) => (
        <motion.span
          key={`${point.x}-${point.y}`}
          className="absolute size-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,.8)]"
          style={{ left: point.x, top: point.y }}
          animate={reduceMotion ? undefined : { scale: [1, 1.65, 1], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.2, delay: index * 0.35, repeat: Infinity }}
        />
      ))}
      <motion.div
        className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-[#07101a]/88 p-3 backdrop-blur"
        animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-[9px] font-medium text-white">
            <ShieldCheck size={13} className="text-emerald-200" aria-hidden="true" />
            Evidence verified
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-cyan-200/70">Live signal</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <span className="h-1.5 rounded-full bg-cyan-300/35" />
          <span className="h-1.5 rounded-full bg-violet-300/35" />
          <span className="h-1.5 rounded-full bg-emerald-300/35" />
        </div>
      </motion.div>
    </div>
  );
}

function InfrastructureVisual({ reduceMotion }: MotionPreference) {
  const layers = [
    { label: "Docker environments", icon: Container, top: "12%", left: "10%" },
    { label: "Shared LLM endpoints", icon: ServerCog, top: "35%", left: "24%" },
    { label: "Grafana · Loki · Alloy", icon: Activity, top: "58%", left: "38%" },
    { label: "Git workflow", icon: GitBranch, top: "75%", left: "16%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="project-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="absolute right-[-8%] top-[10%] size-44 rounded-full bg-violet-400/10 blur-3xl" aria-hidden="true" />
      {layers.map((layer, index) => {
        const Icon = layer.icon;
        return (
          <motion.div
            key={layer.label}
            className="absolute w-[62%] rounded-2xl border border-white/10 bg-[#08121d]/92 p-3.5 shadow-2xl shadow-black/25"
            style={{ top: layer.top, left: layer.left, zIndex: 10 - index }}
            animate={reduceMotion ? undefined : { x: [0, index % 2 ? 4 : -4, 0], y: [0, -2, 0] }}
            transition={{ duration: 5 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-300/8 text-cyan-200">
                <Icon size={16} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block text-[9px] font-medium text-white">{layer.label}</span>
                <span className="mt-2 block h-1.5 rounded-full bg-white/7">
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-cyan-300/60 to-violet-300/60"
                    animate={reduceMotion ? undefined : { width: ["28%", "86%", "48%"] }}
                    transition={{ duration: 3.6 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function NewsVisual({ reduceMotion }: MotionPreference) {
  const cards = [
    { title: "Semantic brief", icon: Sparkles, top: "11%", left: "8%", rotate: -4 },
    { title: "Source discovery", icon: FileSearch, top: "37%", left: "31%", rotate: 2 },
    { title: "Grounded answer", icon: ShieldCheck, top: "62%", left: "13%", rotate: -1 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_75%_15%,rgba(167,139,250,0.16),transparent_32%)]">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            className="absolute w-[69%] rounded-2xl border border-white/10 bg-[#09131f]/90 p-4 shadow-2xl shadow-black/25 backdrop-blur"
            style={{ top: card.top, left: card.left, rotate: card.rotate }}
            animate={reduceMotion ? undefined : { y: [0, index % 2 ? 5 : -5, 0] }}
            transition={{ duration: 4.8 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl border border-violet-300/20 bg-violet-300/8 text-violet-200">
                <Icon size={16} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-medium text-white">{card.title}</span>
                <span className="mt-1 block h-1.5 w-4/5 rounded-full bg-white/7" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <span className="h-8 rounded-lg bg-white/[0.045]" />
              <span className="h-8 rounded-lg bg-white/[0.045]" />
              <span className="h-8 rounded-lg bg-white/[0.045]" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function ProductVisual({ reduceMotion }: MotionPreference) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="project-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <motion.div
        className="absolute left-5 top-5 w-[58%] rounded-2xl border border-white/10 bg-[#08121d]/92 p-4"
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[10px] font-medium text-white">
            <Boxes size={13} className="text-cyan-200" aria-hidden="true" />
            Product workflow
          </span>
          <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.7)]" />
        </div>
        <div className="mt-5 grid gap-2">
          {["Reusable interface", "Interactive state", "Validated flow"].map((label, index) => (
            <div key={label} className="rounded-xl border border-white/8 bg-white/[0.035] px-3 py-2.5">
              <span className="block text-[8px] uppercase tracking-[0.14em] text-slate-500">0{index + 1}</span>
              <span className="mt-1 block text-[10px] text-slate-300">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-5 right-5 w-[52%] rounded-2xl border border-cyan-300/15 bg-[#09131f]/94 p-4 shadow-2xl shadow-black/30"
        animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2 text-[10px] font-medium text-white">
          <Database size={14} className="text-cyan-200" aria-hidden="true" />
          Interface state
        </div>
        <div className="mt-4 flex h-16 items-end gap-1.5">
          {[44, 72, 54, 88, 62, 76, 96].map((height, index) => (
            <span key={index} className="flex-1 rounded-t bg-gradient-to-t from-cyan-400/25 to-cyan-200/70" style={{ height: `${height}%` }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectVisual({ kind, compact = false }: ProjectVisualProps) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div
      className={`project-visual relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#050b12] ${
        compact ? "min-h-[250px]" : "min-h-[340px]"
      }`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute -right-16 -top-20 size-64 rounded-full bg-violet-500/12 blur-[90px]"
        animate={reduceMotion ? undefined : { x: [0, -20, 0], y: [0, 18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      {kind === "platform" ? <PlatformVisual reduceMotion={reduceMotion} /> : null}
      {kind === "workflow" ? <WorkflowVisual reduceMotion={reduceMotion} /> : null}
      {kind === "signal" ? <SignalVisual reduceMotion={reduceMotion} /> : null}
      {kind === "infrastructure" ? <InfrastructureVisual reduceMotion={reduceMotion} /> : null}
      {kind === "news" ? <NewsVisual reduceMotion={reduceMotion} /> : null}
      {kind === "health" ? <ProductVisual reduceMotion={reduceMotion} /> : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.035] via-transparent to-black/20" aria-hidden="true" />
    </div>
  );
}

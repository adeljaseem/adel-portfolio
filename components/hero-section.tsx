"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight, FileText, MapPin, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { siteConfig } from "@/lib/site";
import { NetworkOrb } from "@/components/network-orb";
import { RotatingRole } from "@/components/rotating-role";
import { TechMarquee } from "@/components/tech-marquee";

const stats = [
  { value: "3+ years", label: "professional software engineering" },
  { value: "Complete", label: "QuantiFore product frontend" },
  { value: "7+", label: "core services built" },
  { value: "26+", label: "service and infrastructure containers" },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 132]);
  const fade = useTransform(scrollYProgress, [0, 0.86], [1, 0.34]);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 160, damping: 24, mass: 0.7 });
  const rotateY = useSpring(rawRotateY, { stiffness: 160, damping: 24, mass: 0.7 });

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawRotateY.set(x * 8);
    rawRotateX.set(y * -7);
  }

  function resetTilt() {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] scroll-mt-0 items-center overflow-hidden pb-14 pt-28 sm:pt-32"
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <div
        className="absolute left-[5%] top-[17%] size-72 rounded-full bg-cyan-400/8 blur-[115px]"
        aria-hidden="true"
      />
      <div
        className="absolute right-[2%] top-[22%] size-[28rem] rounded-full bg-violet-500/10 blur-[150px]"
        aria-hidden="true"
      />

      <div className="container-shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-9">
          <motion.div style={reduceMotion ? undefined : { y: copyY, opacity: fade }}>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/8 px-3 py-2 text-xs font-medium text-emerald-100"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-45" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
              </span>
              {siteConfig.role} at {siteConfig.employer} · Building QuantiFore
            </motion.div>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200/80 sm:text-[11px]"
            >
              <Sparkles size={14} aria-hidden="true" />
              Full stack · Platform engineering · Applied AI infrastructure
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.13, ease: [0.22, 1, 0.36, 1] }}
              className="font-display mt-5 max-w-5xl text-balance text-[clamp(3rem,6.6vw,5.55rem)] font-semibold leading-[0.99] tracking-[-0.045em] text-white"
            >
              Full Stack Software Engineer building <RotatingRole />.
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.22 }}
              className="mt-7 max-w-2xl text-pretty text-base leading-8 text-slate-300 sm:text-lg"
            >
              I build from interface to infrastructure: React products, Python services,
              event-driven workflows, real-time delivery, local LLMs, and the environments
              that keep them running.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.29 }}
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-cyan-200" aria-hidden="true" />
                {siteConfig.location}
              </span>
              <span className="hidden size-1 rounded-full bg-slate-600 sm:block" aria-hidden="true" />
              <span>{siteConfig.availability}</span>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.35 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href="#work" className="button-primary">
                Explore platform work
                <ArrowDown size={16} aria-hidden="true" />
              </a>
              <Link href="/resume" className="button-secondary">
                <FileText size={16} aria-hidden="true" />
                View résumé
              </Link>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="icon-button"
                aria-label="GitHub profile"
              >
                <FaGithub size={18} aria-hidden="true" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="icon-button"
                aria-label="LinkedIn profile"
              >
                <FaLinkedinIn size={18} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-[610px] [perspective:1200px]"
            style={reduceMotion ? undefined : { y: visualY, opacity: fade }}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, rotateY: -5 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
              className="hero-depth-panel relative aspect-square overflow-hidden rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-white/[0.055] to-white/[0.015] shadow-[0_55px_140px_-48px_rgba(34,211,238,0.38)] backdrop-blur-sm"
            >
              <div className="absolute inset-5 rounded-[1.75rem] border border-dashed border-white/8" aria-hidden="true" />
              <NetworkOrb />
              <div className="absolute left-5 top-5 rounded-xl border border-white/10 bg-[#07101a]/78 px-3 py-2 backdrop-blur-md [transform:translateZ(42px)]">
                <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-slate-500">Engineering scope</span>
                <span className="mt-1 block text-xs font-medium text-white">Product → Services → Platform</span>
              </div>
              <div className="absolute bottom-5 right-5 rounded-xl border border-violet-300/15 bg-[#07101a]/78 px-3 py-2 text-right backdrop-blur-md [transform:translateZ(34px)]">
                <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-slate-500">Current platform</span>
                <span className="mt-1 block text-xs font-medium text-violet-100">Intelligence + simulation</span>
              </div>
            </motion.div>

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -7, 0], rotateZ: [0, -0.4, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 left-8 hidden rounded-2xl border border-white/10 bg-[#09111b]/90 p-4 shadow-xl shadow-black/25 backdrop-blur-xl sm:block"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-200/70">Latest build</span>
              <div className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
                Evidence-backed signal intelligence
                <ArrowUpRight size={14} className="text-cyan-200" aria-hidden="true" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-cell bg-[#07101a]/90 px-5 py-5 sm:px-6">
              <span className="font-display block text-xl font-semibold tracking-tight text-white sm:text-2xl">{stat.value}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <TechMarquee />
        </div>
      </div>
    </section>
  );
}

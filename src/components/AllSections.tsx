"use client";

import {
  ArrowDown,
  Box,
  BriefcaseBusiness,
  Building2,
  Code2,
  Download,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { hero, nav, profile } from "@/lib/data";

const metrics = [
  { value: "3+", label: "years building production software" },
  { value: "7+", label: "core Quantifore services built" },
  { value: "26+", label: "service and infrastructure containers" },
  { value: "3", label: "development, staging, and production workflows" },
];

export function AllSections({ onOpenWorld }: { onOpenWorld: () => void }) {
  return (
    <div className="min-h-screen bg-void text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-void/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-4 px-5 sm:px-6 lg:px-8">
          <a href="#home" className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
              {profile.initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-ink">
                {profile.name}
              </span>
              <span className="mono-tag block truncate text-[8px] text-mist-dim">
                Plain portfolio
              </span>
            </span>
          </a>

          <nav className="ml-auto hidden items-center gap-5 xl:flex" aria-label="Portfolio sections">
            {nav.slice(1).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-mist transition hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 xl:ml-4">
            <button
              type="button"
              onClick={onOpenWorld}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-2 text-xs font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-signal hover:text-signal sm:px-4"
            >
              <Box className="size-4" />
              <span className="hidden sm:inline">3D city</span>
            </button>
            <a
              href={profile.resumeHref}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-2 text-xs font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-signal hover:text-signal sm:px-4"
            >
              <Download className="size-4" />
              <span className="hidden sm:inline">Resume</span>
            </a>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub profile"
              className="flex size-9 items-center justify-center rounded-full border border-line bg-panel text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-signal hover:text-signal"
            >
              <SiGithub className="size-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="portfolio-main">
        <section id="home" className="mx-auto max-w-7xl px-5 pt-8 pb-5 sm:px-6 sm:pt-10 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-line bg-panel shadow-[0_22px_70px_rgba(31,39,57,0.08)]">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12 xl:p-14">
                <div className="mono-tag flex items-center gap-3 text-[10px] text-mist">
                  <span className="h-px w-8 bg-line" aria-hidden />
                  {hero.eyebrow}
                </div>

                <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.96] font-semibold tracking-[-0.045em] text-balance sm:text-6xl xl:text-7xl">
                  {hero.plainHeadline}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-mist sm:text-lg">
                  {hero.sub}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={hero.ctaPrimary.href}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-signal"
                  >
                    {hero.ctaPrimary.label}
                    <ArrowDown className="size-4" />
                  </a>
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-signal hover:text-signal"
                  >
                    <SiGithub className="size-4" />
                    GitHub
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>

              <div className="relative min-h-[430px] overflow-hidden border-t border-line lg:min-h-full lg:border-t-0 lg:border-l">
                <div
                  className="absolute inset-[-12px] scale-105 bg-cover bg-center blur-[2px]"
                  style={{ backgroundImage: "url('/city-preview.webp')" }}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,249,245,0.12),rgba(17,24,39,0.72))]" />

                <div className="relative flex h-full min-h-[430px] flex-col justify-between p-6 sm:p-8">
                  <div className="ml-auto w-full max-w-[260px] rounded-[1.6rem] border border-white/55 bg-white/88 p-5 shadow-xl backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <span className="flex size-12 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
                        {profile.initials}
                      </span>
                      <div>
                        <p className="font-display text-lg font-semibold text-ink">{profile.name}</p>
                        <p className="text-xs text-mist">{profile.role}</p>
                      </div>
                    </div>
                    <div className="mt-5 space-y-3 border-t border-line pt-4 text-xs leading-5 text-mist">
                      <p className="flex gap-2.5">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-ink" />
                        {profile.location}
                      </p>
                      <p className="flex gap-2.5">
                        <Code2 className="mt-0.5 size-4 shrink-0 text-ink" />
                        {profile.focus}
                      </p>
                      <p className="flex gap-2.5">
                        <BriefcaseBusiness className="mt-0.5 size-4 shrink-0 text-ink" />
                        {profile.availability}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenWorld}
                    className="group mt-8 max-w-md rounded-[1.6rem] border border-white/25 bg-slate-950/72 p-5 text-left text-white shadow-2xl backdrop-blur-lg transition hover:-translate-y-1 hover:bg-slate-950/82"
                  >
                    <span className="mono-tag inline-flex items-center gap-2 text-[9px] text-cyan-200">
                      <Building2 className="size-4" />
                      Portfolio city
                    </span>
                    <span className="mt-3 block font-display text-2xl font-semibold">
                      Walk through the work
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-slate-200">
                      Open the 3D view, walk through the city, and choose a building to open a section.
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white">
                      Enter the city
                      <ExternalLink className="size-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="border-b border-line p-5 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
                >
                  <p className="font-display text-2xl font-semibold text-ink">{metric.value}</p>
                  <p className="mt-1 text-xs leading-5 text-mist">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-10 text-xs text-mist sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Built with Next.js, React, and a small 3D city.</p>
      </footer>
    </div>
  );
}

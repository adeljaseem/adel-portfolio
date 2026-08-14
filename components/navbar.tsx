"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    if (mobileOpen) document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!isHome) return;

    const ids = ["home", ...navItems.map((item) => item.section)];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0.05, 0.2, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.div
        className="fixed inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-cyan-300 via-violet-400 to-emerald-300"
        style={{ scaleX: scrollYProgress }}
      />

      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#07101a]/72 px-3 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:px-5"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          aria-label={`${siteConfig.name}, home`}
        >
          <span className="grid size-10 place-items-center rounded-xl border border-cyan-300/25 bg-cyan-300/8 font-mono text-sm font-semibold tracking-wider text-cyan-200 transition group-hover:border-cyan-300/50 group-hover:bg-cyan-300/12">
            AJ
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block text-sm font-semibold text-white">{siteConfig.name}</span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-slate-400">
              Software engineer · AI platforms
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const href = isHome ? `#${item.section}` : item.href;
            const active = isHome && activeSection === item.section;
            return (
              <a
                key={item.section}
                href={href}
                className={`rounded-xl px-3.5 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                  active ? "bg-white/8 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
                aria-current={active ? "location" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={isHome ? "#contact" : "/#contact"}
            className="hidden items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2.5 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/55 hover:bg-cyan-300/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:flex"
          >
            Let&apos;s talk
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 lg:hidden"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-[#07101a]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl lg:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.section}
                  href={isHome ? `#${item.section}` : item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3.5 text-sm font-medium text-slate-200 transition hover:bg-white/7 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300"
            >
              View GitHub profile
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

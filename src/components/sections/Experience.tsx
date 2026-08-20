"use client";

import { useEffect, useRef } from "react";
import { Radio } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechChip } from "@/components/ui/TechBadge";
import { gsap } from "@/lib/gsap";
import { experience } from "@/lib/data";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative border-t border-line py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          channel="02"
          label="Experience"
          title="What I have built in production"
          description="Most of my work sits between the React interface, Python services, and the systems that connect them."
        />

        <div className="relative mt-14">
          <div className="absolute top-2 left-[7px] h-[calc(100%-1rem)] w-px bg-line sm:left-[9px]" />
          <div
            ref={lineRef}
            className="absolute top-2 left-[7px] h-[calc(100%-1rem)] w-px bg-gradient-to-b from-signal to-pulse sm:left-[9px]"
          />

          <div className="space-y-16">
            {experience.map((role) => (
              <Reveal key={`${role.company}-${role.start}`} className="relative pl-8 sm:pl-10">
                <span className="absolute top-1.5 left-0 flex size-4 items-center justify-center rounded-full border border-signal bg-void sm:size-5">
                  <span className="size-1.5 rounded-full bg-signal" />
                </span>

                <div className="mono-tag mb-2 text-[11px] text-mist-dim">
                  {role.start} to {role.end}
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink">
                  {role.role}
                </h3>
                <p className="mt-1 text-signal">
                  {role.company}
                  <span className="text-mist-dim"> · {role.location}</span>
                </p>
                <p className="mt-4 max-w-2xl text-mist">{role.summary}</p>

                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {role.achievements.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-mist">
                      <Radio className="mt-0.5 size-3.5 shrink-0 text-signal" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {role.stack.map((tech) => (
                    <TechChip key={tech} name={tech} />
                  ))}
                </div>
              </Reveal>
            ))}

            <Reveal className="relative pl-8 sm:pl-10">
              <span className="absolute top-1.5 left-0 flex size-4 items-center justify-center rounded-full border border-line bg-void sm:size-5">
                <span className="size-1.5 rounded-full bg-mist-dim" />
              </span>
              <p className="mono-tag text-[11px] text-mist-dim">
                Earlier work is shown in the Projects section below
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

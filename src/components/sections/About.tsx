import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading channel="01" label="About" title="A little about me" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <Reveal delay={0.08} className="space-y-5">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "text-xl leading-9 text-ink sm:text-2xl"
                    : "leading-8 text-mist"
                }
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.16}>
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {about.readouts.map((readout) => (
                <div
                  key={readout.label}
                  className="rounded-2xl border border-line bg-void/55 p-5"
                >
                  <dt className="mono-tag text-[9px] text-mist-dim">{readout.label}</dt>
                  <dd className="mt-2 font-display text-2xl font-semibold text-ink">
                    {readout.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

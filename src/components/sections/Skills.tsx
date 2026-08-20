import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechBadge } from "@/components/ui/TechBadge";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          channel="04"
          label="Skills"
          title="Tools I use"
          description="I mainly use React on the front end, and Python with FastAPI on the back end."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, i) => (
            <Reveal key={category.title} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-line bg-panel/40 p-6 transition-colors hover:border-signal/40">
                <h3 className="mono-tag mb-4 text-xs text-mist-dim">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <TechBadge key={item.name} name={item.name} icon={item.icon} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

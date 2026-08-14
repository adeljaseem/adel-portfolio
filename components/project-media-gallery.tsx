import Image from "next/image";
import { ImageIcon, ScanLine } from "lucide-react";
import type { ProjectMedia } from "@/lib/portfolio-data";

type ProjectMediaGalleryProps = {
  items: ProjectMedia[];
  compact?: boolean;
};

export function ProjectMediaGallery({ items, compact = false }: ProjectMediaGalleryProps) {
  const visibleItems = compact ? items.slice(0, 4) : items;

  return (
    <div className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "md:grid-cols-2"}`}>
      {visibleItems.map((item, index) => {
        const prominent = !compact && index === 0 && visibleItems.length > 2;

        return (
          <figure
            key={`${item.label}-${index}`}
            className={`project-media-slot group relative overflow-hidden rounded-2xl border border-white/10 bg-[#07101a] ${prominent ? "min-h-64 md:col-span-2 md:min-h-[430px]" : compact ? "min-h-44" : "min-h-72"}`}
          >
            {item.src ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.025]"
                sizes={prominent ? "(max-width: 768px) 100vw, 78vw" : "(max-width: 768px) 100vw, 40vw"}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center overflow-hidden p-5 text-center">
                <div className="project-grid absolute inset-0 opacity-55" aria-hidden="true" />
                <div className="absolute left-[12%] top-[22%] size-28 rounded-full bg-cyan-300/8 blur-3xl" aria-hidden="true" />
                <div className="absolute bottom-[10%] right-[8%] size-32 rounded-full bg-violet-400/8 blur-3xl" aria-hidden="true" />
                <div className="relative max-w-sm">
                  <span className="mx-auto grid size-11 place-items-center rounded-2xl border border-cyan-300/15 bg-cyan-300/8 text-cyan-200">
                    <ImageIcon size={19} aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-display text-sm font-semibold text-white sm:text-base">{item.label}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{item.description}</p>
                  <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-slate-500">
                    <ScanLine size={11} aria-hidden="true" />
                    Image slot ready
                  </span>
                </div>
              </div>
            )}

            {item.src ? (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#05070b] via-[#05070b]/85 to-transparent p-5 pt-20">
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p>
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}

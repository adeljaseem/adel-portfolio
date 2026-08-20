import { renderTechIcon } from "@/lib/icons";

export function TechBadge({ name, icon }: { name: string; icon?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel/60 px-3 py-1 text-xs text-mist">
      {icon ? renderTechIcon(icon, "size-3.5 text-signal") : null}
      {name}
    </span>
  );
}

export function TechChip({ name }: { name: string }) {
  return (
    <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-mist">
      {name}
    </span>
  );
}

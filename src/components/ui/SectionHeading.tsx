import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  channel: string; // e.g. "01"
  label: string; // e.g. "About"
  title: string;
  align?: "left" | "center";
  description?: string;
};

export function SectionHeading({
  channel,
  label,
  title,
  align = "left",
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <div
        className={`mono-tag flex items-center gap-3 text-xs text-signal ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="text-mist-dim">CH.{channel}</span>
        <span className="h-px w-8 bg-line" aria-hidden />
        <span>{label}</span>
      </div>
      <h2
        className={`mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-xl text-mist ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

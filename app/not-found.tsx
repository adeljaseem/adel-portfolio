import Link from "next/link";
import { ArrowLeft, Orbit } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[82vh] items-center justify-center pb-16 pt-28">
      <div className="max-w-xl text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/8 text-cyan-200">
          <Orbit size={28} aria-hidden="true" />
        </span>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/70">
          404 · Route not found
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
          This path is outside the current graph.
        </h1>
        <p className="mt-5 text-base leading-8 text-slate-400">
          The page may have moved, or the link may be incomplete.
        </p>
        <Link href="/" className="button-primary mt-8">
          <ArrowLeft size={16} aria-hidden="true" />
          Return home
        </Link>
      </div>
    </div>
  );
}

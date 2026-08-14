import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `View or download the professional résumé for ${siteConfig.name}.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <section className="resume-page min-h-screen px-3 pb-20 pt-28 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to portfolio
            </Link>
            <p className="eyebrow mt-8">Professional résumé</p>
            <h1 className="font-display mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
              Professional résumé.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              View the updated résumé directly in the browser, download the ATS-friendly PDF, or keep an editable DOCX copy.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={siteConfig.resumePath}
              target="_blank"
              rel="noreferrer"
              className="button-secondary"
            >
              <ExternalLink size={16} aria-hidden="true" />
              Open PDF
            </a>
            <a href={siteConfig.resumePath} download className="button-primary">
              <Download size={16} aria-hidden="true" />
              Download PDF
            </a>
            <a href={siteConfig.resumeDocxPath} download className="button-secondary">
              <FileText size={16} aria-hidden="true" />
              Download DOCX
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-2 shadow-[0_45px_120px_-55px_rgba(34,211,238,0.28)] sm:p-3">
          <object
            data={`${siteConfig.resumePath}#view=FitH&toolbar=1&navpanes=0`}
            type="application/pdf"
            className="pdf-frame block w-full rounded-[1.25rem]"
            aria-label={`${siteConfig.name} résumé PDF`}
          >
            <div className="grid min-h-[520px] place-items-center rounded-[1.25rem] bg-[#07101a] p-8 text-center">
              <div className="max-w-lg">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/8 text-cyan-200">
                  <FileText size={24} aria-hidden="true" />
                </span>
                <h2 className="font-display mt-5 text-xl font-semibold text-white">
                  Your browser did not load the embedded PDF.
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Open the résumé in a new tab or download it using the buttons above.
                </p>
              </div>
            </div>
          </object>
        </div>

      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUp, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer border-t border-white/10 bg-[#04070b]">
      <div className="container-shell flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm font-semibold text-slate-200">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Software engineering across product interfaces, distributed services, and AI platforms.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={siteConfig.links.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="icon-button"
            aria-label="Start a WhatsApp conversation"
          >
            <MessageCircle size={17} aria-hidden="true" />
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="icon-button"
            aria-label="GitHub profile"
          >
            <FaGithub size={17} aria-hidden="true" />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="icon-button"
            aria-label="LinkedIn profile"
          >
            <FaLinkedinIn size={17} aria-hidden="true" />
          </a>
          <Link href="#main-content" className="icon-button" aria-label="Back to the top">
            <ArrowUp size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

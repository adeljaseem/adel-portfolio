import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site";

const links = [
  {
    label: "WhatsApp",
    value: siteConfig.phone,
    href: siteConfig.links.whatsapp,
    icon: FaWhatsapp,
  },
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "Professional profile",
    href: siteConfig.links.linkedin,
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    value: "Public repositories",
    href: siteConfig.links.github,
    icon: FaGithub,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-pad relative overflow-hidden pb-20 sm:pb-28">
      <div
        className="absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-[170px]"
        aria-hidden="true"
      />

      <div className="container-shell relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let’s discuss a real engineering problem."
            copy="I am interested in Software Engineer, Full Stack, Backend, and AI Platform opportunities involving complex products, distributed systems, and end-to-end ownership."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal className="h-full">
            <aside className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-[#07101a]/80 p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-300/20 bg-emerald-300/8 px-3 py-2 text-xs text-emerald-100">
                <span className="size-2 rounded-full bg-emerald-300" />
                {siteConfig.availability}
              </div>

              <p className="mt-7 text-base leading-8 text-slate-300">
                Use the form for a detailed message, or open a direct conversation through WhatsApp, email, or LinkedIn.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {links.map((link) => {
                  const Icon = link.icon;
                  const external = link.href.startsWith("http");

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-300/8 text-cyan-200">
                        <Icon size={19} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-500">{link.label}</span>
                        <span className="mt-1 block truncate text-sm font-medium text-slate-200">{link.value}</span>
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-200"
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>

              <div className="mt-auto flex items-center gap-3 pt-9 text-sm text-slate-500">
                <MapPin size={16} className="text-cyan-200/70" aria-hidden="true" />
                {siteConfig.location}
              </div>
            </aside>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <div className="h-full rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">
              <div className="mb-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/75">Secure contact form</p>
                <h3 className="font-display mt-3 text-2xl font-semibold tracking-[-0.035em] text-white">Send a project or role enquiry.</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  The form uses a server-side email API when configured. No EmailJS key is exposed in the browser.
                </p>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

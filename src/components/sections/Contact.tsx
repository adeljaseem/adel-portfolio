"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { LinkedinIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { contact, profile } from "@/lib/data";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const { serviceId, templateId, publicKey } = contact.emailjs;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          channel="05"
          label="Contact"
          title={contact.heading}
          description={contact.sub}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.1} className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 rounded-xl border border-line bg-panel/30 p-5 transition-colors hover:border-signal/40"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-void text-signal">
                <Mail className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="mono-tag text-[10px] text-mist-dim">Email</p>
                <p className="truncate text-ink">{profile.email}</p>
              </div>
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-4 rounded-xl border border-line bg-panel/30 p-5 transition-colors hover:border-signal/40"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-void text-signal">
                <Phone className="size-4" />
              </span>
              <div>
                <p className="mono-tag text-[10px] text-mist-dim">Phone</p>
                <p className="text-ink">{profile.phone}</p>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-xl border border-line bg-panel/30 p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-void text-signal">
                <MapPin className="size-4" />
              </span>
              <div>
                <p className="mono-tag text-[10px] text-mist-dim">Location</p>
                <p className="text-ink">{profile.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 pt-3 pl-1">
              <a href={profile.social.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-mist transition-colors hover:text-signal">
                <SiGithub className="size-5" />
              </a>
              <a href={profile.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-mist transition-colors hover:text-signal">
                <LinkedinIcon className="size-5" />
              </a>
              <a href={profile.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-mist transition-colors hover:text-signal">
                <SiInstagram className="size-5" />
              </a>

              <span className="mono-tag ml-auto inline-flex items-center gap-2 text-[11px] text-signal">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
                </span>
                Available
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-xl border border-line bg-panel/30 p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="from_name" type="text" required />
                <Field label="Email" name="reply_to" type="email" required />
              </div>
              <Field label="Subject" name="subject" type="text" />
              <div>
                <label className="mono-tag mb-2 block text-[11px] text-mist-dim">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-none rounded-lg border border-line bg-void px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-mist-dim focus:border-signal"
                  placeholder="What are you building?"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 font-medium text-void transition-transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? "Sending…" : "Send message"}
                <Send className="size-4" />
              </button>

              {status === "success" && (
                <p className="flex items-center gap-2 text-sm text-signal">
                  <CheckCircle2 className="size-4" />
                  Message sent. I will get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="flex items-center gap-2 text-sm text-pulse">
                  <AlertCircle className="size-4" />
                  Something went wrong. Please email me directly.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mono-tag mb-2 block text-[11px] text-mist-dim">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-line bg-void px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-signal"
      />
    </div>
  );
}

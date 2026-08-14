"use client";

import { type FormEvent, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  TriangleAlert,
} from "lucide-react";

type FormStatus =
  | { state: "idle"; message: "" }
  | { state: "submitting"; message: string }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

type ContactResponse = {
  ok?: boolean;
  message?: string;
  code?: string;
};

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({
    state: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ state: "submitting", message: "Sending your message…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? ""),
          message: String(data.get("message") ?? ""),
          website: String(data.get("website") ?? ""),
        }),
      });

      const payload = (await response
        .json()
        .catch(() => null)) as ContactResponse | null;

      if (!response.ok) {
        const fallback =
          payload?.code === "NOT_CONFIGURED"
            ? "The hosted form is not configured yet. Please use the WhatsApp or email link beside this form."
            : "The message could not be sent. Please use WhatsApp or the direct email link instead.";
        throw new Error(payload?.message || fallback);
      }

      form.reset();
      setStatus({
        state: "success",
        message:
          payload?.message ||
          "Message sent. Thanks — I’ll get back to you soon.",
      });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "The message could not be sent. Please use WhatsApp or the direct email link instead.",
      });
    }
  }

  const busy = status.state === "submitting";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" aria-busy={busy}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="form-field">
          <span>Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={80}
            required
            placeholder="Your name"
          />
        </label>
        <label className="form-field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            maxLength={160}
            required
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label className="form-field">
        <span>
          Company or context <em>optional</em>
        </span>
        <input
          type="text"
          name="company"
          autoComplete="organization"
          maxLength={120}
          placeholder="What are you building?"
        />
      </label>

      <label className="form-field">
        <span>Message</span>
        <textarea
          name="message"
          rows={6}
          minLength={20}
          maxLength={3_000}
          required
          placeholder="Tell me about the product, platform, or engineering problem."
        />
      </label>

      <label className="sr-only" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={busy}
          className="button-primary disabled:cursor-wait disabled:opacity-70"
        >
          {busy ? (
            <LoaderCircle
              size={16}
              className="animate-spin"
              aria-hidden="true"
            />
          ) : null}
          {busy ? "Sending…" : "Send message"}
          {!busy ? <ArrowRight size={16} aria-hidden="true" /> : null}
        </button>
        <p className="max-w-sm text-xs leading-6 text-slate-500">
          Used only to reply. No marketing list, tracking pixel, or browser-exposed email credential.
        </p>
      </div>

      <div aria-live="polite" aria-atomic="true" className="min-h-7">
        {status.state === "success" ? (
          <p className="flex items-start gap-2 text-sm leading-6 text-emerald-200">
            <CheckCircle2
              size={17}
              className="mt-1 shrink-0"
              aria-hidden="true"
            />
            {status.message}
          </p>
        ) : null}
        {status.state === "error" ? (
          <p className="flex items-start gap-2 text-sm leading-6 text-amber-200">
            <TriangleAlert
              size={17}
              className="mt-1 shrink-0"
              aria-hidden="true"
            />
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

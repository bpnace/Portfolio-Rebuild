"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Status = {
  type: "idle" | "success" | "error";
  message: string;
};

const initialStatus: Status = { type: "idle", message: "" };

export function Contact() {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(initialStatus);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      project: String(formData.get("project") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Die Anfrage konnte nicht gesendet werden.");
      }

      setStatus({
        type: "success",
        message: result.message || "Danke. Die Anfrage wurde aufgenommen.",
      });
      event.currentTarget.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Die Anfrage konnte nicht gesendet werden.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="kontakt" className="section-space">
      <div className="section-shell grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeader label="Kontakt" marker="(SKWKHS® — 11)" />
          <div className="space-y-6">
            <h2 className="display-lg">Gib uns 30 Minuten, um dein Projekt zu verstehen.</h2>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              Im Erstgespräch klären wir Angebot, Zielgruppe und Projektumfang,
              damit eine saubere Entscheidung möglich wird – ohne künstlichen
              Sales-Druck.
            </p>
            <div className="space-y-3 text-sm text-muted">
              <div>{siteConfig.location}</div>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass-card space-y-5 p-6 md:p-8">
          <div>
            <label htmlFor="name" className="eyebrow">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-2 w-full rounded-2xl border border-border bg-white/4 px-4 py-3 outline-none transition focus:border-foreground"
              placeholder="Wie sollen wir dich ansprechen?"
            />
          </div>
          <div>
            <label htmlFor="email" className="eyebrow">
              E-Mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-2xl border border-border bg-white/4 px-4 py-3 outline-none transition focus:border-foreground"
              placeholder="name@unternehmen.de"
            />
          </div>
          <div>
            <label htmlFor="project" className="eyebrow">
              Projekt
            </label>
            <textarea
              id="project"
              name="project"
              required
              rows={6}
              className="mt-2 w-full rounded-[1.5rem] border border-border bg-white/4 px-4 py-3 outline-none transition focus:border-foreground"
              placeholder="Worum geht es, was soll die Website leisten, und was ist der aktuelle Stand?"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="link-arrow rounded-full border border-foreground px-6 py-4 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Wird gesendet ..." : "Jetzt Erstgespräch anfragen"}{" "}
            <span aria-hidden>↘</span>
          </button>
          {status.type !== "idle" ? (
            <p
              className={`text-sm ${status.type === "success" ? "text-highlight" : "text-red-300"}`}
            >
              {status.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

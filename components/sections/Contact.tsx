"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { pricingTiers } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import type { PricingTier } from "@/lib/site-data";

type Status = {
  type: "idle" | "success" | "error";
  message: string;
};

const initialStatus: Status = { type: "idle", message: "" };
const PRESET_LIMIT = 3;

function buildPackageProjectMessage(selectedPackage: string | null): string {
  const packageSlug = selectedPackage?.toLowerCase().trim();
  if (!packageSlug) {
    return "";
  }

  const tier = pricingTiers.find(
    (entry: PricingTier) => entry.name.toLowerCase() === packageSlug,
  );
  if (!tier) {
    return "";
  }

  const topFeatures = tier.features
    .filter((feature) => feature.enabled)
    .slice(0, PRESET_LIMIT)
    .map((feature) => feature.label);

  const featureText =
    topFeatures.length > 0 ? `\n\nEnthalten:\n- ${topFeatures.join("\n- ")}` : "";

  return `Wir interessieren uns für das Paket "${tier.name}".\n\n`
    + `Kurz: ab ${tier.price} €, ${tier.timeline}, ${tier.pages}.`
    + featureText
    + "\n\nErgänze bitte:\n- Dein Ziel\n- Gewünschter Umfang\n- Wann soll gestartet werden?\n\nWir freuen uns auf dein Update!";
}

type ContactFormProps = {
  selectedPackage: string | null;
};

function ContactForm({ selectedPackage }: ContactFormProps) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");

  useEffect(() => {
    const prefill = buildPackageProjectMessage(selectedPackage);
    if (prefill) {
      setProject(prefill);
    }
  }, [selectedPackage]);

  const isNameValid = name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isProjectValid = project.trim().length >= 12;
  const isFormValid = isNameValid && isEmailValid && isProjectValid;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

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
      setName("");
      setEmail("");
      setProject("");
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
    <form onSubmit={onSubmit} className="pt-26">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow text-white">
            <b>Name</b>
          </label>
          <input
            id="name"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-none border-b border-border bg-transparent px-0 py-3 outline-none transition focus:border-foreground placeholder:text-white/35 placeholder:italic"
            placeholder="Wie sollen wir dich ansprechen?"
          />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow text-white">
            <b>E-Mail</b>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-none border-b border-border bg-transparent px-0 py-3 outline-none transition focus:border-foreground placeholder:text-white/35 placeholder:italic"
            placeholder="name@unternehmen.de"
          />
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="project" className="eyebrow text-white">
          <b>Projekt</b>
        </label>
        <textarea
          id="project"
          name="project"
          required
          rows={9}
          value={project}
          onChange={(event) => setProject(event.target.value)}
          className="mt-2 min-h-[18rem] w-full bg-transparent px-0 py-3 outline-none transition focus:border-foreground placeholder:text-white/35 placeholder:italic"
          placeholder="Worum geht es, was soll die Website leisten, und was ist der aktuelle Stand?"
        />
      </div>
      <div className="mt-6 flex flex-col items-center gap-4 border-t border-border pt-6">
        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="link-arrow mx-auto w-fit border border-border px-6 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-30"
        >
          {isSubmitting ? "Wird gesendet ..." : "Jetzt Erstgespräch anfragen"}{" "}
        </button>
        {status.type !== "idle" ? (
          <p className="max-w-xl text-sm text-muted">{status.message}</p>
        ) : null}
      </div>
    </form>
  );
}

function ContactFormWithSearchParams() {
  const searchParams = useSearchParams();
  return <ContactForm selectedPackage={searchParams.get("paket")} />;
}

export function Contact() {
  return (
    <section id="kontakt" className="section-space">
      <div className="section-shell grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] xl:gap-20">
        <div>
          <SectionHeader label="Kontakt" marker="(SKWKHS® — 10)" />
          <div className="space-y-6">
            <h2 className="display-lg">Lass uns was einzigartiges bauen.</h2>
            <p className="max-w-4xl text-lg leading-8 text-muted">
              Wir klären gemeinsam, worum’s geht, was gerade bremst und was als Nächstes
              Priorität hat. Angebot schärfen, Zielgruppe sauber einordnen und Projektumfang
              realisieren damit der nächsten Schritt nicht aus dem Bauch heraus entscheiden wird.
            </p>
            <div className="space-y-3 text-sm text-muted">
              <div>{siteConfig.location}</div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover-weight-link hover:text-foreground"
              >
                <LinkRippleText text={siteConfig.email} />
              </a>
            </div>
          </div>
        </div>

        <Suspense fallback={<ContactForm selectedPackage={null} />}>
          <ContactFormWithSearchParams />
        </Suspense>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { services } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ensureGsap,
  gsap,
  refreshScrollTriggers,
  useGSAP,
  withMotionPreference,
} from "@/lib/gsap";

export function Services() {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ensureGsap();

      const rows = gsap.utils.toArray<HTMLElement>(".service-row");

      const cleanup = withMotionPreference({
        reduce: () => {
          gsap.set(rows, { autoAlpha: 1, y: 0 });
        },
        motion: () => {
          rows.forEach((row, index) => {
            gsap.from(row, {
              autoAlpha: 0,
              y: 24,
              duration: 0.55,
              delay: index * 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                once: true,
              },
            });
          });
          refreshScrollTriggers();
        },
      });

      return cleanup;
    },
    { scope },
  );

  return (
    <section id="leistungen" className="section-space">
      <div ref={scope} className="section-shell">
        <SectionHeader label="Leistungen" marker="(SKWKHS® — 03)" />
        <div className="mb-10 max-w-4xl space-y-4 md:mb-16">
          <h2 className="display-lg">Klare Leistungen für Sichtbarkeit, Systeme und Wachstum.</h2>
          <p className="text-lg leading-8 text-muted">
            Gute Websites entstehen dort, wo Strategie, Gestaltung, technische
            Qualität und saubere Prozesse zusammen gedacht werden.
          </p>
        </div>

        <div className="space-y-4">
          {services.map((service) => (
            <article
              key={service.number}
              className="service-row grid gap-4 border-b border-border py-6 md:grid-cols-[90px_220px_1fr]"
            >
              <div className="eyebrow text-foreground/80">{service.number}</div>
              <h3 className="text-2xl font-semibold tracking-tight">{service.title}</h3>
              <p className="text-muted">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

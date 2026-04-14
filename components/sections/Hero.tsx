"use client";

import Link from "next/link";
import { useRef } from "react";
import { ensureGsap, gsap, shouldReduceMotion, useGSAP } from "@/lib/gsap";
import { siteConfig } from "@/lib/site-config";
import { StaggeredCycle } from "@/components/ui/StaggeredCycle";

export function Hero() {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ensureGsap();

      const lines = gsap.utils.toArray<HTMLElement>(".hero-line");
      const copy = gsap.utils.toArray<HTMLElement>(".hero-copy");
      const actions = gsap.utils.toArray<HTMLElement>(".hero-action");

      if (shouldReduceMotion()) {
        gsap.set([...lines, ...copy, ...actions], { autoAlpha: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      timeline
        .from(lines, {
          autoAlpha: 0,
          y: 64,
          duration: 0.9,
          stagger: 0.08,
        })
        .from(
          copy,
          {
            autoAlpha: 0,
            y: 24,
            duration: 0.55,
            stagger: 0.1,
          },
          "-=0.35",
        )
        .from(
          actions,
          {
            autoAlpha: 0,
            y: 18,
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.2",
        );
    },
    { scope },
  );

  return (
    <section ref={scope} >
      <div className="section-shell grid gap-14 xl:items-start">
        <div className="space-y-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="hero-copy eyebrow text-foreground/75">Stackwerkhaus</div>
            <div className="hero-copy md:text-right">
              <a
                href={`mailto:${siteConfig.email}`}
                className="link-arrow text-foreground"
              >
                Kontakt
              </a>
              <div className="text-[11px] uppercase tracking-[0.32em] text-muted">
                {siteConfig.location}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="hero-line display-xl">Deine digitalen</div>
            <div className="hero-line display-xl">Architekten.</div>
          </div>
          <div className="hero-copy text-[11px] uppercase tracking-[0.38em] text-muted md:text-xs">
            Für Webdesign · Für Entwicklung · Für Relaunch · Für SEO · Für Automatisierung
          </div>
          <div className="hero-copy">
            <StaggeredCycle words={["Planen.", "Bauen.", "Liefern."]} />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/#kontakt" className="hero-action link-arrow rounded-full border border-foreground px-6 py-4">
              Jetzt Erstgespräch buchen <span aria-hidden>↘</span>
            </Link>
            <Link href="/#leistungen" className="hero-action link-arrow rounded-full border border-border px-6 py-4 text-muted hover:text-foreground">
              Leistungen ansehen <span aria-hidden>↘</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section ref={scope} className="section-space">
      <div className="section-shell grid gap-12 lg:grid-cols-[1.35fr_0.8fr] lg:items-end">
        <div className="space-y-8">
          <div className="hero-copy eyebrow">Berlin / Remote</div>
          <div className="space-y-4">
            <div className="hero-line display-xl">Deine digitalen</div>
            <div className="hero-line display-xl">Architekten.</div>
          </div>
          <div className="hero-copy max-w-3xl text-lg leading-8 text-muted md:text-xl">
            Webdesign, Entwicklung, Relaunch und technisches SEO für
            Dienstleister, kleine Unternehmen und neue Marken, die digital
            strukturierter, klarer und überzeugender auftreten wollen.
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

        <aside className="glass-card hero-copy space-y-8 p-6 md:p-8">
          <div className="eyebrow">Stackwerkhaus</div>
          <div className="space-y-4">
            <div className="text-3xl font-semibold tracking-tight">
              Websites, die nicht nur gut aussehen, sondern präzise führen.
            </div>
            <p className="text-muted">
              Wir verbinden Positionierung, Inhaltsführung, Design und technische
              Umsetzung, damit Besucher schneller verstehen, was angeboten wird
              und was der nächste sinnvolle Schritt ist.
            </p>
          </div>
          <div className="grid gap-4 border-t border-border pt-6 text-sm text-muted">
            <div className="flex items-center justify-between gap-4">
              <span>Fokus</span>
              <span>Dienstleister, KMU, neue Marken</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Standort</span>
              <span>{siteConfig.location}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Kontakt</span>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                {siteConfig.email}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

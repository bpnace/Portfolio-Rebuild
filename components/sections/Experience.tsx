"use client";

import { useRef } from "react";
import { experience } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ensureGsap,
  gsap,
  refreshScrollTriggers,
  useGSAP,
  withMotionPreference,
} from "@/lib/gsap";

export function Experience() {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ensureGsap();

      const bgText = gsap.utils.toArray<HTMLElement>(".experience-bg")[0];
      if (!bgText) {
        return;
      }

      const cleanup = withMotionPreference({
        reduce: () => {
          gsap.set(bgText, { xPercent: 0 });
        },
        motion: () => {
          gsap.to(bgText, {
            xPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: bgText,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
          refreshScrollTriggers();
        },
      });

      return cleanup;
    },
    { scope },
  );

  return (
    <section className="section-space overflow-hidden">
      <div ref={scope} className="section-shell relative">
        <SectionHeader label="Erfahrung" marker="(SKWKHS® — 06)" />
        <div className="experience-bg pointer-events-none absolute left-0 top-24 hidden whitespace-nowrap text-[clamp(6rem,18vw,16rem)] font-display font-semibold tracking-[-0.08em] text-white/5 lg:block">
          Digital Craft
        </div>
        <div className="relative space-y-4">
          {experience.map((entry) => (
            <article
              key={entry.title}
              className="glass-card grid gap-4 px-6 py-5 md:grid-cols-[1.1fr_180px_220px_120px] md:items-center"
            >
              <h3 className="text-2xl font-semibold tracking-tight">{entry.title}</h3>
              <div className="text-sm text-muted">{entry.years}</div>
              <div className="text-sm text-muted">{entry.role}</div>
              <div className="text-sm text-muted">{entry.place}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

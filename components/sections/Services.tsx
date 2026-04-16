"use client";

import { useRef } from "react";
import { services } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrambleField } from "@/components/ui/ScrambleField";
import {
  ScrollTrigger,
  ensureGsap,
  gsap,
  refreshScrollTriggers,
  shouldReduceMotion,
  useGSAP,
} from "@/lib/gsap";
import {
  getFieldVisual,
  getInitialScrambleText,
  getScrambleFrameText,
} from "@/lib/scramble";

const TITLE_DURATION_MS = 860;
const TITLE_TRIGGER_START = "top bottom+=6%";

export function Services() {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    (_, contextSafe) => {
      ensureGsap();

      const safe =
        contextSafe ??
        (<T extends (...args: never[]) => unknown>(fn: T) => fn);

      const root = scope.current;
      if (!root) {
        return;
      }

      const rows = gsap.utils.toArray<HTMLElement>(".service-row", root);
      const titleFields = gsap.utils.toArray<HTMLElement>(
        ".service-title [data-scramble-field='true']",
        root,
      );
      const activeFrames = new Map<HTMLElement, number>();
      let playedRows = new WeakSet<HTMLElement>();

      const stopActiveWork = () => {
        activeFrames.forEach((frameId) => {
          window.cancelAnimationFrame(frameId);
        });
        activeFrames.clear();
      };

      const showFinalText = (visible: boolean) => {
        titleFields.forEach((field) => {
          const visual = getFieldVisual(field);
          if (!visual) {
            return;
          }

          visual.textContent = field.dataset.scrambleText ?? "";
          gsap.set(visual, { autoAlpha: visible ? 1 : 0 });
        });
      };

      const animateTitle = safe((field: HTMLElement) => {
        const visual = getFieldVisual(field);
        const targetText = field.dataset.scrambleText ?? "";

        if (!visual) {
          return;
        }

        if (!targetText.length) {
          gsap.set(visual, { autoAlpha: 1 });
          return;
        }

        const characters = Array.from(targetText);
        const startedAt = window.performance.now();
        const initialText = getInitialScrambleText(characters);

        gsap.set(visual, { autoAlpha: 1 });
        visual.textContent = initialText;

        const tick = (timestamp: number) => {
          const progress = Math.min((timestamp - startedAt) / TITLE_DURATION_MS, 1);
          const resolvedCharacters = Math.floor(progress * characters.length);

          visual.textContent = getScrambleFrameText(
            characters,
            resolvedCharacters,
          );

          if (progress >= 1) {
            visual.textContent = targetText;
            activeFrames.delete(visual);
            return;
          }

          const nextFrameId = window.requestAnimationFrame(tick);
          activeFrames.set(visual, nextFrameId);
        };

        const frameId = window.requestAnimationFrame(tick);
        activeFrames.set(visual, frameId);
      });

      const startRow = safe((row: HTMLElement) => {
        if (playedRows.has(row)) {
          return;
        }

        playedRows.add(row);

        const titleField = row.querySelector<HTMLElement>(
          ".service-title [data-scramble-field='true']",
        );

        if (!titleField) {
          return;
        }

        animateTitle(titleField);
      });

      if (shouldReduceMotion()) {
        stopActiveWork();
        playedRows = new WeakSet<HTMLElement>();
        showFinalText(true);

        return () => {
          stopActiveWork();
        };
      }

      stopActiveWork();
      playedRows = new WeakSet<HTMLElement>();
      showFinalText(false);

      rows.forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: TITLE_TRIGGER_START,
          once: true,
          onEnter: () => {
            startRow(row);
          },
        });
      });
      refreshScrollTriggers();

      return () => {
        stopActiveWork();
      };
    },
    { scope, revertOnUpdate: true },
  );

  return (
    <section id="leistungen" className="section-space">
      <div ref={scope} className="section-shell">
        <SectionHeader label="Leistungen" marker="(SKWKHS® — 03)" />
        <div className="mb-10 max-w-4xl space-y-4 md:mb-16">
          <h2 className="display-lg"> Strategie, Design, Code. Ohne lästiges Überdenken.</h2>
          <p className="text-lg leading-8 text-muted">
             Wir schärfen Angebote, bauen klare Nutzerführung und entwickeln Frontends,
             die stabil laufen, schnell verstanden werden und nicht nur in deinem Pitchdeck gut aussehen.
          </p>
        </div>

        <div className="space-y-4">
          {services.map((service) => (
            <article
              key={service.number}
              className="service-row grid gap-4 border-b border-border py-6 md:grid-cols-[90px_220px_1fr]"
            >
              <div className="eyebrow text-foreground/80">{service.number}</div>
              <h3 className="service-title text-2xl font-semibold tracking-tight">
                <ScrambleField text={service.title} />
              </h3>
              <p className="text-muted">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

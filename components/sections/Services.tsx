"use client";

import { useRef } from "react";
import { services } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ScrollTrigger,
  ensureGsap,
  gsap,
  refreshScrollTriggers,
  useGSAP,
  withMotionPreference,
} from "@/lib/gsap";

type ScrambleFieldProps = {
  text: string;
};

const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const TITLE_DURATION_MS = 860;
const TITLE_TRIGGER_START = "top bottom+=6%";

function pickRandomCharacter(source: string) {
  const randomIndex = Math.floor(Math.random() * source.length);
  return source[randomIndex] ?? source[0] ?? "";
}

function getScrambleCharacter(character: string) {
  if (/\d/u.test(character)) {
    return pickRandomCharacter(DIGITS);
  }

  if (/\p{L}/u.test(character)) {
    return pickRandomCharacter(
      character === character.toUpperCase()
        ? UPPERCASE_LETTERS
        : LOWERCASE_LETTERS,
    );
  }

  return character;
}

function getFieldVisual(field: HTMLElement) {
  return field.querySelector<HTMLElement>("[data-scramble-visual='true']");
}

function ScrambleField({ text }: ScrambleFieldProps) {
  return (
    <span
      className="experience-scramble"
      data-scramble-field="true"
      data-scramble-text={text}
    >
      <span className="sr-only">{text}</span>
      <span className="experience-scramble-stack" aria-hidden="true">
        <span className="experience-scramble-reserve">{text}</span>
        <span
          className="experience-scramble-visual"
          data-scramble-visual="true"
        >
          {text}
        </span>
      </span>
    </span>
  );
}

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
        const initialText = characters
          .map((character) => getScrambleCharacter(character))
          .join("");

        gsap.set(visual, { autoAlpha: 1 });
        visual.textContent = initialText;

        const tick = (timestamp: number) => {
          const progress = Math.min((timestamp - startedAt) / TITLE_DURATION_MS, 1);
          const resolvedCharacters = Math.floor(progress * characters.length);

          visual.textContent = characters
            .map((character, characterIndex) =>
              characterIndex < resolvedCharacters
                ? character
                : getScrambleCharacter(character),
            )
            .join("");

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

      const cleanup = withMotionPreference({
        reduce: () => {
          stopActiveWork();
          playedRows = new WeakSet<HTMLElement>();
          showFinalText(true);
        },
        motion: () => {
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
        },
      });

      return () => {
        stopActiveWork();
        cleanup();
      };
    },
    { scope, revertOnUpdate: true },
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

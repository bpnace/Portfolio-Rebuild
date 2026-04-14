"use client";

import { Fragment, useRef } from "react";
import { skills } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ensureGsap,
  gsap,
  refreshScrollTriggers,
  useGSAP,
  withMotionPreference,
} from "@/lib/gsap";

function renderProfileName(name: string) {
  const words = name.split(" ");

  return words.map((word, wordIndex) => (
    <Fragment key={`${word}-${wordIndex}`}>
      <span className="profile-name-word">
        {Array.from(word).map((character, charIndex) => (
          <span
            key={`${word}-${charIndex}`}
            className="profile-name-char"
          >
            <span className="profile-name-outline">{character}</span>
            <span className="profile-name-fill">{character}</span>
          </span>
        ))}
      </span>
      {wordIndex < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

export function Profile() {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ensureGsap();

      const root = scope.current;
      if (!root) {
        return;
      }

      const title = root.querySelector<HTMLElement>(".profile-name");
      const fills = Array.from(
        root.querySelectorAll<HTMLElement>(".profile-name-fill"),
      );

      const cleanup = withMotionPreference({
        reduce: () => {
          gsap.set(fills, { clipPath: "inset(0% 0 0 0)" });
        },
        motion: () => {
          if (!title || !fills.length) {
            return;
          }

          gsap.set(fills, { clipPath: "inset(100% 0 0 0)" });

          gsap.timeline({
            scrollTrigger: {
              trigger: title,
              start: "top 82%",
              end: "top 46%",
              scrub: 0.85,
            },
          }).to(fills, {
            clipPath: "inset(0% 0 0 0)",
            ease: "none",
            stagger: 0.055,
          });
          refreshScrollTriggers();
        },
      });

      return cleanup;
    },
    { scope, revertOnUpdate: true },
  );

  return (
    <section className="section-space">
      <div ref={scope} className="section-shell grid gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <SectionHeader label="Profil" marker="(SKWKHS® — 04)" />
          <div className="space-y-6">
            <div className="profile-name display-md">
              {renderProfileName(siteConfig.founder)}
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              Webdesigner und Frontend-Entwickler aus Berlin. Stackwerkhaus
              verbindet Positionierung, Inhaltsführung, Design und technische
              Umsetzung, damit Websites nicht nur präsent sind, sondern präziser
              führen.
            </p>
          </div>
        </div>

        <div className="grid gap-x-8 sm:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill} className="border-t border-border py-3 text-sm text-foreground/90">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

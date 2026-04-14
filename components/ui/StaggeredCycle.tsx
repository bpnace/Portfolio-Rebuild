"use client";

import { useRef } from "react";
import { ensureGsap, gsap, shouldReduceMotion, useGSAP } from "@/lib/gsap";

type StaggeredCycleProps = {
  words: string[];
};

export function StaggeredCycle({ words }: StaggeredCycleProps) {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ensureGsap();

      const elements = gsap.utils.toArray<HTMLElement>(".cycle-word");
      if (!elements.length) {
        return;
      }

      if (shouldReduceMotion()) {
        elements.forEach((element, index) => {
          gsap.set(element, { autoAlpha: index === 0 ? 1 : 0, yPercent: 0 });
        });
        return;
      }

      gsap.set(elements, { autoAlpha: 0, yPercent: 112 });
      gsap.set(elements[0], { autoAlpha: 1, yPercent: 0 });

      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.15 });
      elements.forEach((element, index) => {
        const next = elements[(index + 1) % elements.length];

        timeline
          .to(element, {
            autoAlpha: 0,
            yPercent: -112,
            duration: 0.45,
            delay: 1.18,
            ease: "power3.in",
          })
          .fromTo(
            next,
            { autoAlpha: 0, yPercent: 112 },
            { autoAlpha: 1, yPercent: 0, duration: 0.55, ease: "power3.out" },
            "<0.04",
          );
      });
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      className="display-xl relative h-[1.18em] overflow-hidden md:h-[1.2em]"
    >
      {words.map((word) => (
        <div
          key={word}
          className="cycle-word absolute inset-x-0 top-0 whitespace-nowrap text-foreground"
        >
          {word}
        </div>
      ))}
    </div>
  );
}

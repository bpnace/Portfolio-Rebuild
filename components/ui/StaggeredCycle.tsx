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
          gsap.set(element, { autoAlpha: index === 0 ? 1 : 0, y: 0 });
        });
        return;
      }

      gsap.set(elements, { autoAlpha: 0, y: 60 });
      gsap.set(elements[0], { autoAlpha: 1, y: 0 });

      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.15 });
      elements.forEach((element, index) => {
        const next = elements[(index + 1) % elements.length];

        timeline
          .to(element, {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          })
          .to(element, {
            autoAlpha: 0,
            y: -60,
            duration: 0.45,
            delay: 1.1,
            ease: "power3.in",
          })
          .fromTo(
            next,
            { autoAlpha: 0, y: 60 },
            { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" },
            "<0.08",
          );
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className="relative h-[0.95em] overflow-hidden">
      {words.map((word) => (
        <div
          key={word}
          className="cycle-word absolute inset-0 display-xl text-highlight"
        >
          {word}
        </div>
      ))}
    </div>
  );
}

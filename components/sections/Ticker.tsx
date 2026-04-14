"use client";

import { useRef } from "react";
import { tickerItems } from "@/lib/site-data";
import { ensureGsap, gsap, shouldReduceMotion, useGSAP } from "@/lib/gsap";

export function Ticker() {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ensureGsap();

      const track = gsap.utils.toArray<HTMLElement>(".ticker-track")[0];
      if (!track || shouldReduceMotion()) {
        return;
      }

      gsap.to(track, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    },
    { scope },
  );

  const items = [...tickerItems, ...tickerItems];

  return (
    <section className="overflow-hidden border-y border-border bg-white text-black">
      <div ref={scope} className="-rotate-[1.2deg] py-4">
        <div className="ticker-track flex w-max gap-10 whitespace-nowrap px-6 md:gap-16 md:px-12">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="text-[length:var(--label)] uppercase tracking-[0.4em]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

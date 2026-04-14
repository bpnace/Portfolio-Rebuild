"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { ensureGsap, gsap, shouldReduceMotion, useGSAP } from "@/lib/gsap";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scope = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      ensureGsap();

      if (!panelRef.current) {
        return;
      }

      if (shouldReduceMotion()) {
        gsap.set(panelRef.current, {
          autoAlpha: open ? 1 : 0,
          y: open ? 0 : -24,
          pointerEvents: open ? "auto" : "none",
        });
        return;
      }

      gsap.to(panelRef.current, {
        autoAlpha: open ? 1 : 0,
        y: open ? 0 : -24,
        duration: 0.35,
        ease: "power3.out",
        pointerEvents: open ? "auto" : "none",
      });
    },
    { dependencies: [open], scope, revertOnUpdate: true },
  );

  return (
    <div
      ref={scope}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="section-shell flex h-20 items-center justify-between">
        <Link
          href="/"
          className="text-[11px] font-black uppercase text-foreground md:text-[13px]"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-7 text-[length:var(--label)] uppercase tracking-[0.34em] text-muted md:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover-weight-link hover:text-foreground"
            >
              <LinkRippleText text={item.label} />
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="eyebrow text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "Schließen" : "Menü"}
        </button>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        className="pointer-events-none absolute inset-x-0 top-full border-t border-border bg-black/96 px-6 py-8 opacity-0 md:hidden"
      >
        <nav className="flex flex-col gap-5 text-xl font-bold tracking-[-0.04em] text-foreground">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="hover-weight-link border-b border-border pb-4"
            >
              <LinkRippleText text={item.label} baseWeight={700} />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

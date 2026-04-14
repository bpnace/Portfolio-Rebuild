"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { ensureGsap, gsap, shouldReduceMotion, useGSAP } from "@/lib/gsap";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

function renderAnimatedNavLabel(text: string) {
  return (
    <span className="nav-word" aria-label={text}>
      {Array.from(text).map((character, index) => (
        <span key={`${text}-${index}`} className="nav-letter" aria-hidden="true">
          {character}
        </span>
      ))}
    </span>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [homeIntroCovered, setHomeIntroCovered] = useState(false);
  const [homeNavReady, setHomeNavReady] = useState(false);
  const pathname = usePathname();
  const scope = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const introNavAnimated = useRef(false);
  const useIntroNavState = pathname === "/";
  const introCovered = pathname !== "/" || homeIntroCovered;
  const navReady = pathname !== "/" || homeNavReady;

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

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const applyState = (covered: boolean) => {
      setHomeIntroCovered(covered);
    };

    applyState(document.documentElement.dataset.homeIntroCovered === "true");

    const onIntroCoverChange = (event: Event) => {
      const detail = (event as CustomEvent<{ covered?: boolean }>).detail;
      applyState(Boolean(detail?.covered));
    };

    window.addEventListener("home-intro-cover-change", onIntroCoverChange);
    return () => {
      window.removeEventListener("home-intro-cover-change", onIntroCoverChange);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    let pageLoaded = document.readyState === "complete";
    let heroIntroReady =
      document.documentElement.dataset.homeHeroIntroReady === "true";

    const maybeMarkReady = () => {
      if (pageLoaded && heroIntroReady) {
        setHomeNavReady(true);
      }
    };

    maybeMarkReady();

    const onLoad = () => {
      pageLoaded = true;
      maybeMarkReady();
    };

    const onHeroReady = () => {
      heroIntroReady = true;
      maybeMarkReady();
    };

    window.addEventListener("load", onLoad);
    window.addEventListener("home-hero-intro-ready", onHeroReady);

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("home-hero-intro-ready", onHeroReady);
    };
  }, [pathname]);

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

  useGSAP(
    () => {
      ensureGsap();

      if (!useIntroNavState || !navReady) {
        return;
      }

      const navRoot = scope.current;
      if (!navRoot) {
        return;
      }

      const letters = Array.from(navRoot.querySelectorAll<HTMLElement>(".nav-letter"));
      if (!letters.length) {
        return;
      }

      if (introNavAnimated.current) {
        gsap.set(letters, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          visibility: "visible",
        });
        return;
      }

      if (shouldReduceMotion()) {
        gsap.set(letters, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          visibility: "visible",
        });
        introNavAnimated.current = true;
        return;
      }

      gsap.set(letters, {
        autoAlpha: 0,
        y: -10,
        filter: "blur(6px)",
        visibility: "visible",
      });

      const startAnimation = () => {
        gsap.to(letters, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.52,
          ease: "power3.out",
          stagger: {
            each: 0.022,
            from: "random",
          },
          overwrite: true,
          onComplete: () => {
            introNavAnimated.current = true;
          },
        });
      };

      const scheduleAnimation = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(startAnimation);
        });
      };

      if (document.readyState === "complete") {
        scheduleAnimation();
        return;
      }

      const onLoad = () => {
        scheduleAnimation();
      };

      window.addEventListener("load", onLoad, { once: true });
      return () => {
        window.removeEventListener("load", onLoad);
      };
    },
    { dependencies: [useIntroNavState, navReady], scope, revertOnUpdate: true },
  );

  return (
    <div
      ref={scope}
      data-site-nav="true"
      data-nav-ready={navReady ? "true" : "false"}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        useIntroNavState
          ? introCovered
            ? "bg-black/80 opacity-100 backdrop-blur-xl"
            : "bg-transparent opacity-100"
          : scrolled
            ? "bg-black/80 opacity-100 backdrop-blur-xl"
          : "bg-transparent opacity-100"
      }`}
    >
      <div className="section-shell flex h-20 items-center justify-between">
        <Link
          href="/"
          className="text-[11px] font-black uppercase text-foreground md:text-[13px]"
        >
          {renderAnimatedNavLabel(siteConfig.name)}
        </Link>

        <nav className="hidden items-center gap-7 text-[length:var(--label)] uppercase tracking-[0.34em] text-muted md:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover-weight-link hover:text-foreground"
            >
              {renderAnimatedNavLabel(item.label)}
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
          {renderAnimatedNavLabel(open ? "Schließen" : "Menü")}
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

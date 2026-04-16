"use client";

import { useEffect, useState } from "react";

const HOME_PATH = "/";

export function useNavScrolled(threshold = 32) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);
}

export function useHomeIntroCovered(pathname: string) {
  const [homeIntroCovered, setHomeIntroCovered] = useState(false);

  useEffect(() => {
    if (pathname !== HOME_PATH) {
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

  return homeIntroCovered;
}

export function useHomeNavReady(pathname: string) {
  const [homeNavReady, setHomeNavReady] = useState(false);

  useEffect(() => {
    if (pathname !== HOME_PATH) {
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

  return homeNavReady;
}

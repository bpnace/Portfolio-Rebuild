"use client";

import { useEffect } from "react";

const ccm19ScriptId = "ccm19";
const ccm19ScriptSrc =
  "https://cloud.ccm19.de/app.js?apiKey=eefc8fecf37d0d4d42423ebb8d2ff0c38ee07663469480b8&domain=69c4664129605f52500e0082";

function appendCcm19Script() {
  if (document.getElementById(ccm19ScriptId)) {
    return;
  }

  const script = document.createElement("script");
  script.id = ccm19ScriptId;
  script.src = ccm19ScriptSrc;
  script.async = true;
  script.referrerPolicy = "origin";
  document.head.appendChild(script);
}

export function Ccm19Loader() {
  useEffect(() => {
    let idleHandle: number | undefined;
    let delayHandle: number | undefined;
    let loaded = false;

    const load = () => {
      if (loaded) {
        return;
      }

      loaded = true;
      appendCcm19Script();
    };

    const queueLoad = (delay: number) => {
      delayHandle = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleHandle = window.requestIdleCallback(load, { timeout: 1200 });
          return;
        }

        load();
      }, delay);
    };

    const loadOnInteraction = () => {
      load();
    };

    window.addEventListener("pointermove", loadOnInteraction, { once: true });
    window.addEventListener("pointerdown", loadOnInteraction, { once: true });
    window.addEventListener("keydown", loadOnInteraction, { once: true });
    window.addEventListener("scroll", loadOnInteraction, {
      once: true,
      passive: true,
    });

    queueLoad(window.location.pathname === "/" ? 0 : 400);

    return () => {
      if (delayHandle !== undefined) {
        window.clearTimeout(delayHandle);
      }

      if (
        idleHandle !== undefined &&
        "cancelIdleCallback" in window
      ) {
        window.cancelIdleCallback(idleHandle);
      }

      window.removeEventListener("pointermove", loadOnInteraction);
      window.removeEventListener("pointerdown", loadOnInteraction);
      window.removeEventListener("keydown", loadOnInteraction);
      window.removeEventListener("scroll", loadOnInteraction);
    };
  }, []);

  return null;
}

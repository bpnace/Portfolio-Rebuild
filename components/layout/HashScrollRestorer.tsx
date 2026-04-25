"use client";

import { useEffect, useRef } from "react";

const retryDelays = [0, 120, 450, 1000] as const;

function getCurrentHashTargetId() {
  const hash = window.location.hash.replace(/^#/, "");

  if (!hash) {
    return "";
  }

  try {
    return decodeURIComponent(hash);
  } catch {
    return hash;
  }
}

export function HashScrollRestorer() {
  const timeoutIds = useRef<number[]>([]);

  useEffect(() => {
    function clearScheduledScrolls() {
      timeoutIds.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIds.current = [];
    }

    function scrollToCurrentHash() {
      clearScheduledScrolls();
      const targetId = getCurrentHashTargetId();

      if (!targetId) {
        return;
      }

      timeoutIds.current = retryDelays.map((delay) =>
        window.setTimeout(() => {
          const target = document.getElementById(targetId);

          if (!target) {
            return;
          }

          target.scrollIntoView({
            block: "start",
            behavior: "auto",
          });
        }, delay),
      );
    }

    scrollToCurrentHash();
    window.addEventListener("hashchange", scrollToCurrentHash);

    return () => {
      window.removeEventListener("hashchange", scrollToCurrentHash);
      clearScheduledScrolls();
    };
  }, []);

  return null;
}

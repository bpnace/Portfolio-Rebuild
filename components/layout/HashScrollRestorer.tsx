"use client";

import { useEffect } from "react";

const retryDelays = [0, 120, 450, 1000] as const;

function scrollToCurrentHash() {
  const hash = window.location.hash.replace(/^#/, "");

  if (!hash) {
    return;
  }

  const decodedHash = decodeURIComponent(hash);

  retryDelays.forEach((delay) => {
    window.setTimeout(() => {
      const target = document.getElementById(decodedHash);

      if (!target) {
        return;
      }

      target.scrollIntoView({
        block: "start",
        behavior: "auto",
      });
    }, delay);
  });
}

export function HashScrollRestorer() {
  useEffect(() => {
    scrollToCurrentHash();
    window.addEventListener("hashchange", scrollToCurrentHash);

    return () => {
      window.removeEventListener("hashchange", scrollToCurrentHash);
    };
  }, []);

  return null;
}

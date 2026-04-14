"use client";

import { useRef, useState } from "react";
import { ensureGsap, gsap, shouldReduceMotion } from "@/lib/gsap";

type FAQItemProps = {
  question: string;
  answer: string;
};

export function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggle = () => {
    ensureGsap();

    if (!contentRef.current || shouldReduceMotion()) {
      setOpen((value) => !value);
      return;
    }

    if (!open) {
      gsap.fromTo(
        contentRef.current,
        { height: 0, autoAlpha: 0 },
        { height: "auto", autoAlpha: 1, duration: 0.35, ease: "power2.out" },
      );
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        autoAlpha: 0,
        duration: 0.28,
        ease: "power2.in",
      });
    }

    setOpen((value) => !value);
  };

  return (
    <div className="border-b border-border py-6">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-start justify-between gap-8 text-left"
        aria-expanded={open}
      >
        <span className="text-lg font-medium leading-7">{question}</span>
        <span className="text-2xl text-muted">{open ? "−" : "+"}</span>
      </button>
      <div
        ref={contentRef}
        style={open && shouldReduceMotion() ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="overflow-hidden"
      >
        <p className="pt-4 max-w-3xl text-muted">{answer}</p>
      </div>
    </div>
  );
}

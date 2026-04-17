"use client";

import { useRef } from "react";
import { ensureGsap, gsap, shouldReduceMotion, useGSAP } from "@/lib/gsap";
import type { BlogPost } from "@/lib/blog";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const BLOG_HEADING = "Zwischen Rohbau, Launch und Feinschliff.";

function renderBlogHeading() {
  const words = BLOG_HEADING.split(" ");

  return words.map((word, index) => (
    <span key={`${word}-${index}`}>
      <span className="hero-word">
        <span className="hero-word-text">
          {Array.from(word).map((character, charIndex) => (
            <span key={`${word}-${charIndex}`} className="hero-char">
              {character}
            </span>
          ))}
        </span>
        <span className="hero-word-mask" aria-hidden />
      </span>
      {index < words.length - 1 ? " " : null}
    </span>
  ));
}

type BlogSectionProps = {
  posts: BlogPost[];
};

export function BlogSection({ posts }: BlogSectionProps) {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!scope.current) {
        return;
      }

      ensureGsap();

      const wordTexts = gsap.utils.toArray<HTMLElement>(".hero-word-text", scope.current);
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char", scope.current);
      const masks = gsap.utils.toArray<HTMLElement>(".hero-word-mask", scope.current);

      if (shouldReduceMotion()) {
        gsap.set(wordTexts, { autoAlpha: 1 });
        gsap.set(chars, { autoAlpha: 1, yPercent: 0, filter: "blur(0px)" });
        gsap.set(masks, { autoAlpha: 0, scaleX: 0, xPercent: 0 });
        return;
      }

      gsap.set(wordTexts, { autoAlpha: 1 });
      gsap.set(chars, { autoAlpha: 0, yPercent: 0, filter: "blur(8px)" });
      gsap.set(masks, {
        autoAlpha: 1,
        scaleX: 0,
        xPercent: 0,
        transformOrigin: "left center",
      });

      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

      wordTexts.forEach((wordText, index) => {
        const wordChars = gsap.utils.toArray<HTMLElement>(".hero-char", wordText);
        const wordMask = masks[index];
        if (!wordMask || !wordChars.length) {
          return;
        }

        timeline
          .to(
            wordMask,
            {
              scaleX: 1,
              duration: 0.44,
              ease: "expo.out",
            },
            index * 0.32,
          )
          .to(
            wordMask,
            {
              xPercent: 102,
              duration: 0.55,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(wordMask, { autoAlpha: 0 });
              },
            },
            ">",
          )
          .to(
            wordChars,
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.44,
              stagger: 0.03,
              ease: "power3.out",
            },
            "<0.08",
          );
      });
    },
    { scope, dependencies: [posts], revertOnUpdate: true },
  );

  return (
    <section id="blog" className="section-space">
      <div ref={scope} className="section-shell">
        <SectionHeader label="Publikationen" marker="(SKWKHS® — 08)" />
        <div className="mb-10 max-w-4xl space-y-4 md:mb-16">
          <h2 className="hero-line display-lg">{renderBlogHeading()}</h2>
          <p className="text-lg leading-8 text-muted">
            Notizen aus Projekten, Relaunches und Systementscheidungen, die
            später selten auf der fertigen Startseite sichtbar sind, aber dort
            fast immer den Unterschied machen.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} variant="home" />
          ))}
        </div>
      </div>
    </section>
  );
}

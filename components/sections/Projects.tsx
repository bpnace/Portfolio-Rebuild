"use client";

import { useRef } from "react";
import { ensureGsap, gsap, shouldReduceMotion, useGSAP } from "@/lib/gsap";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Project } from "@/lib/projects";

const projectsIntro = "Sieht gut aus. Funktioniert noch besser.";

function renderProjectsIntro() {
  const words = projectsIntro.split(" ");

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

type ProjectsProps = {
  projects: Project[];
};

export function Projects({ projects }: ProjectsProps) {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ensureGsap();

      const root = scope.current;
      if (!root) {
        return;
      }

      const wordTexts = gsap.utils.toArray<HTMLElement>(".hero-word-text", root);
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char", root);
      const masks = gsap.utils.toArray<HTMLElement>(".hero-word-mask", root);

      if (shouldReduceMotion()) {
        gsap.set([...wordTexts, ...chars], {
          autoAlpha: 1,
          y: 0,
          yPercent: 0,
          filter: "blur(0px)",
        });
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

      const timeline = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

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
    { scope, dependencies: [projects], revertOnUpdate: true },
  );

  return (
    <section id="projekte" className="section-space">
      <div className="section-shell">
        <SectionHeader label="Projekte" marker="(SKWKHS® — 02)" />
        <div ref={scope} className="mb-10 max-w-3xl space-y-4 md:mb-16">
          <h2 className="display-lg">{renderProjectsIntro()}</h2>
          <p className="text-lg leading-8 text-muted">
              Hier landen keine drapierten Showcase-Screens, sondern Projekte,
              bei denen Design, Nutzerführung und technische Umsetzung gemeinsam dafür sorgen, dass
              aus Aufmerksamkeit auch echtes Interesse wird.
          </p>
        </div>
        <div>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} index={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

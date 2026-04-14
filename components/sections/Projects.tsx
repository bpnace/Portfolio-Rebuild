import type { Project } from "@/lib/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

type ProjectsProps = {
  projects: Project[];
};

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projekte" className="section-space">
      <div className="section-shell">
        <SectionHeader label="Projekte" marker="(SKWKHS® — 02)" />
        <div className="mb-10 max-w-3xl space-y-4 md:mb-16">
          <h2 className="display-lg">Digitale Systeme mit klarer Angebotslogik.</h2>
          <p className="text-lg leading-8 text-muted">
            Keine Galerie für hübsche Shots, sondern eine Auswahl an Arbeiten, bei
            denen Struktur, Verständlichkeit und technische Umsetzung zusammen
            gedacht wurden.
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

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
          <h2 className="display-lg">Sieht gut aus. Funktioniert noch besser.</h2>
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

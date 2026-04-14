import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  index: number;
  project: Project;
};

export function ProjectCard({ index, project }: ProjectCardProps) {
  return (
    <Link
      href={`/projekte/${project.slug}`}
      className="group grid gap-4 border-b border-border py-6 transition-colors hover:border-foreground/40 md:grid-cols-[72px_1.2fr_120px_1fr_40px] md:items-center"
    >
      <span className="eyebrow text-foreground/80">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <div className="flex items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: project.accent }}
          />
          <div className="text-2xl font-semibold tracking-tight">{project.title}</div>
        </div>
        <p className="mt-2 max-w-xl text-sm text-muted md:hidden">{project.teaser}</p>
      </div>
      <span className="text-sm text-muted">{project.year}</span>
      <div className="text-sm text-muted">{project.category}</div>
      <span className="text-right text-xl text-muted transition-transform group-hover:translate-x-1 group-hover:text-foreground">
        →
      </span>
    </Link>
  );
}

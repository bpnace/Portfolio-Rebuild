import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Nicht gefunden",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projekte/${project.slug}`,
    },
    openGraph: {
      url: `/projekte/${project.slug}`,
      title: `${project.title} | STACKWERKHAUS`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="section-space">
      <article className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <div className="eyebrow flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: project.accent }}
              />
              <span>{project.category}</span>
            </div>
            <h1 className="display-lg">{project.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-muted">
              {project.summary}
            </p>
          </div>
          <div className="glass-card space-y-5 p-6 md:p-8">
            <div className="grid gap-4 text-sm text-muted">
              <div className="flex items-center justify-between gap-4">
                <span>Jahr</span>
                <span>{project.year}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Kategorie</span>
                <span>{project.category}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Ort</span>
                <span>{project.location}</span>
              </div>
            </div>
            {project.services.length ? (
              <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                {project.services.map((service) => (
                  <span key={service} className="chip">
                    {service}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {project.deliverables.length ? (
          <div className="mt-10 flex flex-wrap gap-3">
            {project.deliverables.map((deliverable) => (
              <span key={deliverable} className="chip">
                {deliverable}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-14">
          <CustomMDX source={project.content} />
        </div>
      </article>
    </main>
  );
}

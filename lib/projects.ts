import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ProjectFrontmatter = {
  title: string;
  category: string;
  year: string;
  location: string;
  summary: string;
  teaser: string;
  featured?: boolean;
  accent?: string;
  services?: string[];
  deliverables?: string[];
};

export type Project = ProjectFrontmatter & {
  slug: string;
  content: string;
  services: string[];
  deliverables: string[];
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function toStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((entry) => String(entry));
}

async function readProjectFile(fileName: string): Promise<Project> {
  const slug = fileName.replace(/\.mdx$/, "");
  const source = await fs.readFile(path.join(PROJECTS_DIR, fileName), "utf8");
  const { data, content } = matter(source);

  return {
    slug,
    title: String(data.title ?? slug),
    category: String(data.category ?? "Projekt"),
    year: String(data.year ?? ""),
    location: String(data.location ?? "Berlin"),
    summary: String(data.summary ?? ""),
    teaser: String(data.teaser ?? ""),
    featured: Boolean(data.featured ?? true),
    accent: String(data.accent ?? "#ffffff"),
    services: toStringArray(data.services),
    deliverables: toStringArray(data.deliverables),
    content,
  };
}

export const getAllProjects = cache(async () => {
  const entries = await fs.readdir(PROJECTS_DIR);
  const projects = await Promise.all(
    entries.filter((entry) => entry.endsWith(".mdx")).map(readProjectFile),
  );

  return projects.sort((a, b) => {
    const yearDelta = Number(b.year) - Number(a.year);
    if (yearDelta !== 0) {
      return yearDelta;
    }

    return a.title.localeCompare(b.title, "de");
  });
});

export async function getFeaturedProjects(limit = 6) {
  const projects = await getAllProjects();
  return projects.filter((project) => project.featured !== false).slice(0, limit);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogFrontmatter = {
  title: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  featured?: boolean;
  accent?: string;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

async function readPostFile(fileName: string): Promise<BlogPost> {
  const slug = fileName.replace(/\.mdx$/, "");
  const source = await fs.readFile(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(source);

  return {
    slug,
    title: String(data.title ?? slug),
    category: String(data.category ?? "Creative Notes"),
    excerpt: String(data.excerpt ?? ""),
    publishedAt: String(data.publishedAt ?? new Date().toISOString()),
    readingTime: String(data.readingTime ?? "4 min"),
    featured: Boolean(data.featured ?? true),
    accent: String(data.accent ?? "#d7f171"),
    content,
  };
}

export const getAllPosts = cache(async () => {
  const entries = await fs.readdir(BLOG_DIR);
  const posts = await Promise.all(
    entries.filter((entry) => entry.endsWith(".mdx")).map(readPostFile),
  );

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
});

export async function getLatestPosts(limit = 4) {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

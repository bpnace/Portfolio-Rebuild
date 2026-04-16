import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogFrontmatter = {
  title: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  featured?: boolean;
  imageUrl?: string | null;
  imageAlt?: string;
  tags?: string[];
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
  source: "drupal" | "local";
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const DRUPAL_CMS_URL =
  process.env.STACKWERKHAUS_CMS_URL ?? "https://cms.stackwerkhaus.de";
const DRUPAL_ARTICLE_ENDPOINT =
  `${DRUPAL_CMS_URL}/jsonapi/node/article?include=field_image,field_tags`;

type DrupalArticleResponse = {
  data?: DrupalArticleResource[];
  included?: DrupalIncludedResource[];
};

type DrupalArticleResource = {
  id: string;
  attributes?: {
    status?: boolean | null;
    title?: string | null;
    created?: string | null;
    changed?: string | null;
    path?: {
      alias?: string | null;
    } | null;
    body?: {
      processed?: string | null;
    } | null;
    field_summary?: {
      processed?: string | null;
    } | null;
    field_category?: string | null;
  } | null;
  relationships?: {
    field_image?: {
      data?: {
        id: string;
        meta?: {
          alt?: string | null;
        } | null;
      } | null;
    } | null;
    field_tags?: {
      data?: Array<{
        id: string;
      }> | null;
    } | null;
  } | null;
};

type DrupalIncludedResource =
  | {
      type: "file--file";
      id: string;
      attributes?: {
        uri?: {
          url?: string | null;
        } | null;
      } | null;
    }
  | {
      type: "taxonomy_term--tags";
      id: string;
      attributes?: {
        name?: string | null;
      } | null;
    };

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeDrupalHtmlToText(value: string) {
  if (!value) {
    return "";
  }

  return value
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|blockquote|pre|article|section)>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[^\S\r\n]{2,}/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
}

function getReadingTime(content: string) {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min`;
}

function getExcerpt(summary: string, body: string) {
  const source = stripHtml(summary) || stripHtml(body);
  if (source.length <= 180) {
    return source;
  }

  return `${source.slice(0, 177).trimEnd()}...`;
}

function getSlugFromAlias(alias: string | null | undefined, title: string, id: string) {
  if (alias) {
    const parts = alias.split("/").filter(Boolean);
    const lastSegment = parts.at(-1);
    if (lastSegment) {
      return lastSegment;
    }
  }

  return slugify(title) || id;
}

async function readPostFile(fileName: string): Promise<BlogPost> {
  const slug = fileName.replace(/\.mdx$/, "");
  const source = await fs.readFile(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(source);

  return {
    slug,
    title: String(data.title ?? slug),
    category: String(data.category ?? "Notizen"),
    excerpt: String(data.excerpt ?? ""),
    publishedAt: String(data.publishedAt ?? new Date().toISOString()),
    updatedAt: String(data.updatedAt ?? data.publishedAt ?? new Date().toISOString()),
    readingTime: String(data.readingTime ?? "4 min"),
    featured: Boolean(data.featured ?? true),
    content,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    imageUrl: data.imageUrl ? String(data.imageUrl) : null,
    imageAlt: data.imageAlt ? String(data.imageAlt) : "",
    source: "local",
  };
}

async function getLocalPosts() {
  const entries = await fs.readdir(BLOG_DIR);
  const posts = await Promise.all(
    entries.filter((entry) => entry.endsWith(".mdx")).map(readPostFile),
  );

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

async function getDrupalPosts(): Promise<BlogPost[]> {
  const response = await fetch(DRUPAL_ARTICLE_ENDPOINT, {
    headers: {
      Accept: "application/vnd.api+json",
    },
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error(`Drupal JSON:API request failed with ${response.status}`);
  }

  const json = (await response.json()) as DrupalArticleResponse;
  const included = json.included ?? [];

  const filesById = new Map(
    included
      .filter((item): item is Extract<DrupalIncludedResource, { type: "file--file" }> => item.type === "file--file")
      .map((item) => [item.id, item]),
  );
  const tagsById = new Map(
    included
      .filter(
        (item): item is Extract<DrupalIncludedResource, { type: "taxonomy_term--tags" }> =>
          item.type === "taxonomy_term--tags",
      )
      .map((item) => [item.id, item]),
  );

  return (json.data ?? [])
    .filter((item) => item.attributes?.status === true)
    .map((item) => {
      const title = item.attributes?.title?.trim() || "Ohne Titel";
      const body = normalizeDrupalHtmlToText(
        item.attributes?.body?.processed ?? "",
      );
      const summary = normalizeDrupalHtmlToText(
        item.attributes?.field_summary?.processed ?? "",
      );
      const category = item.attributes?.field_category?.trim() || "Notizen";
      const publishedAt = item.attributes?.created ?? new Date().toISOString();
      const updatedAt = item.attributes?.changed ?? publishedAt;
      const slug = getSlugFromAlias(item.attributes?.path?.alias, title, item.id);
      const imageId = item.relationships?.field_image?.data?.id;
      const imageFile = imageId ? filesById.get(imageId) : undefined;
      const imageUrl = imageFile?.attributes?.uri?.url
        ? `${DRUPAL_CMS_URL}${imageFile.attributes.uri.url}`
        : null;
      const imageAlt = item.relationships?.field_image?.data?.meta?.alt?.trim() || title;
      const tags =
        item.relationships?.field_tags?.data
          ?.map((tag) => tagsById.get(tag.id)?.attributes?.name?.trim() || "")
          .filter(Boolean) ?? [];

      return {
        slug,
        title,
        category,
        excerpt: getExcerpt(summary, body),
        publishedAt,
        updatedAt,
        readingTime: getReadingTime(body),
        featured: Boolean(item.attributes?.status),
        content: body,
        imageUrl,
        imageAlt,
        tags,
        source: "drupal" as const,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export const getAllPosts = cache(async () => {
  try {
    const drupalPosts = await getDrupalPosts();
    if (drupalPosts.length > 0) {
      return drupalPosts;
    }
  } catch (error) {
    console.error("Failed to fetch Drupal posts", error);
  }

  return getLocalPosts();
});

export async function getLatestPosts(limit = 4) {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

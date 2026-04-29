import { cache } from "react";
import {
  getExcerptFromText,
  getReadingTimeFromText,
  normalizeDrupalHtmlToText,
} from "@/lib/drupal-rich-text.mjs";

export type BlogFrontmatter = {
  title: string;
  category: string;
  excerpt: string;
  metaDescription?: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  featured?: boolean;
  imageUrl?: string | null;
  imageAlt?: string;
  tags?: string[];
};

type BlogPostBase = BlogFrontmatter & {
  slug: string;
};

export type DrupalBlogPost = BlogPostBase & {
  source: "drupal";
  drupalHtml: string;
  drupalPlainText: string;
};

export type BlogPost = DrupalBlogPost;

const DRUPAL_CMS_URL =
  process.env.STACKWERKHAUS_CMS_URL ?? "https://cms.stackwerkhaus.de";
const DRUPAL_ARTICLE_ENDPOINT =
  `${DRUPAL_CMS_URL}/jsonapi/node/article?include=field_image,field_tags`;

const BLOG_META_DESCRIPTIONS: Record<string, string> = {
  micrography:
    "Micrography, technische Typografie und klare Markenhaltung als visuelles System für präzise digitale Auftritte.",
  "webdesign-fur-saas":
    "Webdesign für SaaS-Produkte mit präziser Typografie, starkem Kontrast und klarer Nutzerführung statt generischer Standard-Patterns.",
};

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

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
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

async function getDrupalPosts(): Promise<DrupalBlogPost[]> {
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
      const drupalHtml = item.attributes?.body?.processed ?? "";
      const drupalPlainText = normalizeDrupalHtmlToText(drupalHtml);
      const summary = normalizeDrupalHtmlToText(
        item.attributes?.field_summary?.processed ?? "",
      );
      const category = item.attributes?.field_category?.trim() || "Notizen";
      const publishedAt = item.attributes?.created ?? new Date().toISOString();
      const updatedAt = item.attributes?.changed ?? publishedAt;
      const slug = getSlugFromAlias(item.attributes?.path?.alias, title, item.id);
      const excerpt = getExcerptFromText(summary, drupalPlainText);
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
        excerpt,
        publishedAt,
        updatedAt,
        readingTime: getReadingTimeFromText(drupalPlainText),
        featured: Boolean(item.attributes?.status),
        imageUrl,
        imageAlt,
        tags,
        metaDescription: BLOG_META_DESCRIPTIONS[slug],
        source: "drupal" as const,
        drupalHtml,
        drupalPlainText,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export const getAllPosts = cache(async () => getDrupalPosts());

export async function getLatestPosts(limit = 4) {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

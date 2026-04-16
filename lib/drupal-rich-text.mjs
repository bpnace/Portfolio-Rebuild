import rehypeParse from "rehype-parse";
import { defaultSchema } from "rehype-sanitize";
import rehypeSanitize from "rehype-sanitize";
import { unified } from "unified";

export const DRUPAL_ALLOWED_TAGS = [
  "p",
  "br",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "blockquote",
  "strong",
  "em",
  "code",
  "pre",
  "a",
  "hr",
];

export const DRUPAL_ALLOWED_PROTOCOLS = ["http", "https", "mailto"];

export const drupalSanitizeSchema = {
  ...defaultSchema,
  tagNames: DRUPAL_ALLOWED_TAGS,
  attributes: {
    a: ["href", "title"],
    code: [],
    pre: [],
  },
  protocols: {
    href: DRUPAL_ALLOWED_PROTOCOLS,
  },
};

const drupalHtmlProcessor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeSanitize, drupalSanitizeSchema);

export function createSanitizedDrupalTree(source) {
  if (!source.trim()) {
    return null;
  }

  return drupalHtmlProcessor.runSync(drupalHtmlProcessor.parse(source));
}

export function stripHtml(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function normalizeDrupalHtmlToText(value) {
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
    .replace(/\s+([.,;:!?])/g, "$1")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function getDrupalPlainTextParagraphs(value) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function getReadingTimeFromText(value) {
  const words = value.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min`;
}

export function getExcerptFromText(summary, body) {
  const source = summary || body;
  if (source.length <= 180) {
    return source;
  }

  return `${source.slice(0, 177).trimEnd()}...`;
}

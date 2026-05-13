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
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "caption",
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
    table: [],
    thead: [],
    tbody: [],
    tfoot: [],
    tr: [],
    th: ["scope", "colspan", "rowspan"],
    td: ["colspan", "rowspan"],
    caption: [],
  },
  protocols: {
    href: DRUPAL_ALLOWED_PROTOCOLS,
  },
};

const drupalHtmlProcessor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeSanitize, drupalSanitizeSchema);

const ENCODED_DRUPAL_TAG_PATTERN =
  /&lt;\/?(?:p|h[1-6]|ul|ol|li|blockquote|strong|em|code|pre|a|table|thead|tbody|tfoot|tr|th|td|caption|hr|section)\b/i;

const RAW_TEXT_BLOCK_TAGS = new Set([
  "address",
  "article",
  "aside",
  "blockquote",
  "caption",
  "div",
  "figcaption",
  "figure",
  "footer",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "pre",
  "section",
  "table",
  "tbody",
  "tfoot",
  "thead",
  "tr",
  "ul",
]);

const RAW_TEXT_SPACED_TAGS = new Set(["td", "th"]);
const RAW_TEXT_IGNORED_TAGS = new Set(["script", "style", "template"]);

function appendTextPart(parts, value) {
  if (value) {
    parts.push(value);
  }
}

function appendTextBreak(parts) {
  parts.push("\n");
}

function appendParagraphBreak(parts) {
  parts.push("\n\n");
}

function appendTextSpace(parts) {
  const lastPart = parts.at(-1);
  if (lastPart && !lastPart.endsWith(" ") && lastPart !== "\n") {
    parts.push(" ");
  }
}

function collectHtmlText(node, parts) {
  if (!node) {
    return;
  }

  if (node.type === "text") {
    appendTextPart(parts, node.value);
    return;
  }

  if (node.type !== "root" && node.type !== "element") {
    return;
  }

  if (node.type === "element") {
    const tagName = String(node.tagName || "").toLowerCase();

    if (RAW_TEXT_IGNORED_TAGS.has(tagName)) {
      return;
    }

    if (tagName === "br") {
      appendTextBreak(parts);
      return;
    }

    for (const child of node.children || []) {
      collectHtmlText(child, parts);
    }

    if (RAW_TEXT_SPACED_TAGS.has(tagName)) {
      appendTextSpace(parts);
    }

    if (RAW_TEXT_BLOCK_TAGS.has(tagName)) {
      appendParagraphBreak(parts);
    }

    return;
  }

  for (const child of node.children || []) {
    collectHtmlText(child, parts);
  }
}

function normalizePlainTextWhitespace(value) {
  return value
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[^\S\r\n]{2,}/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractHtmlText(source) {
  const parts = [];
  collectHtmlText(drupalHtmlProcessor.parse(source), parts);
  return normalizePlainTextWhitespace(parts.join(""));
}

export function prepareDrupalHtmlSource(source) {
  if (!source) {
    return "";
  }

  if (!ENCODED_DRUPAL_TAG_PATTERN.test(source)) {
    return source;
  }

  return extractHtmlText(source);
}

export function createSanitizedDrupalTree(source) {
  const preparedSource = prepareDrupalHtmlSource(source);

  if (!preparedSource.trim()) {
    return null;
  }

  return drupalHtmlProcessor.runSync(
    drupalHtmlProcessor.parse(preparedSource),
  );
}

export function stripHtml(value) {
  return normalizeDrupalHtmlToText(value).replace(/\s+/g, " ").trim();
}

export function normalizeDrupalHtmlToText(value) {
  if (!value) {
    return "";
  }

  return extractHtmlText(prepareDrupalHtmlSource(value));
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

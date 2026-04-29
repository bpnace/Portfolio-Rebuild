import assert from "node:assert/strict";
import { DEFAULT_BLOG_SLUG, DEFAULT_PROJECT_SLUG } from "./fixtures/content-slugs.mjs";

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";
const pinnedBlogSlug = process.env.SMOKE_BLOG_SLUG || DEFAULT_BLOG_SLUG;
const richPattern = process.env.SMOKE_BLOG_RICH_PATTERN;
const landingPages = [
  [
    "/website-erstellen-lassen-deutschland",
    "Schnelle professionelle Website erstellen lassen, deutschlandweit",
  ],
  [
    "/webdesign-kleine-unternehmen",
    "Webdesign für kleine Unternehmen, Dienstleister und Gründer",
  ],
  [
    "/landingpage-erstellen-lassen",
    "Landingpage erstellen lassen für Angebote, Kampagnen und Anfragen",
  ],
  [
    "/nextjs-website-erstellen-lassen",
    "Next.js Website erstellen lassen für schnelle moderne Webauftritte",
  ],
  [
    "/ki-website-automatisierung",
    "Website mit KI-Automatisierung erstellen lassen",
  ],
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function fetchHtml(pathname) {
  const response = await fetch(new URL(pathname, baseUrl));
  assert.equal(response.status, 200, `${pathname} returned ${response.status}`);
  return response.text();
}

const homeHtml = await fetchHtml("/");
assert.match(
  homeHtml,
  /aria-controls="mobile-nav"/,
  "home page missing mobile nav trigger",
);
assert.match(
  homeHtml,
  /data-hero-intro="loading"/,
  "home page missing hero intro shell",
);
assert.match(
  homeHtml,
  /name="viewport" content="width=device-width, initial-scale=1"/,
  "home page missing viewport meta tag",
);

const baustellencheckHtml = await fetchHtml("/webseitecheck");
assert.match(
  baustellencheckHtml,
  /Baustellencheck starten/,
  "baustellencheck page missing primary CTA",
);
assert.match(
  baustellencheckHtml,
  /Was wir prüfen/,
  "baustellencheck page missing focused inspection section",
);
assert.doesNotMatch(
  baustellencheckHtml,
  /Sieben Stellen/,
  "baustellencheck page still shows old long inspection framing",
);
assert.match(
  baustellencheckHtml,
  /name="websiteUrl"/,
  "baustellencheck page missing URL field",
);

const baustellencheckDankeHtml = await fetchHtml("/webseitecheck/danke");
assert.match(
  baustellencheckDankeHtml,
  /Deine Baustelle ist eingetragen/,
  "baustellencheck thank-you page missing confirmation headline",
);
assert.match(
  baustellencheckDankeHtml,
  /Was jetzt passiert/,
  "baustellencheck thank-you page missing next-step section",
);

const blogDetailHtml = await fetchHtml(`/blog/${pinnedBlogSlug}`);
assert.match(
  blogDetailHtml,
  /class="mdx-body"/,
  "blog detail page missing article content wrapper",
);
if (richPattern) {
  assert.match(
    blogDetailHtml,
    new RegExp(richPattern),
    "blog detail page missing expected rich content pattern",
  );
}

const projectHtml = await fetchHtml(`/projekte/${DEFAULT_PROJECT_SLUG}`);
assert.match(
  projectHtml,
  /class="section-shell"/,
  "project detail page missing section shell",
);

for (const [pathname, h1] of landingPages) {
  const html = await fetchHtml(pathname);
  assert.match(
    html,
    new RegExp(escapeRegExp(h1)),
    `${pathname} missing landing page H1`,
  );
  assert.match(
    html,
    /"@type":"FAQPage"/,
    `${pathname} missing visible FAQ schema`,
  );
}

console.log(
  "Mobile smoke passed for /, /blog/" +
    pinnedBlogSlug +
    `, /webseitecheck, /webseitecheck/danke, /projekte/${DEFAULT_PROJECT_SLUG}, ` +
    landingPages.map(([pathname]) => pathname).join(", "),
);

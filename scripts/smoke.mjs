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

async function assertRedirect(pathname, expectedPathname) {
  const response = await fetch(new URL(pathname, baseUrl), {
    redirect: "manual",
  });
  assert.equal(response.status, 308, `${pathname} returned ${response.status}`);

  const location = response.headers.get("location");
  assert.ok(location, `${pathname} missing redirect location`);
  assert.equal(
    new URL(location, baseUrl).pathname,
    expectedPathname,
    `${pathname} redirected to ${location}`,
  );
}

async function assertSitemapRoutes() {
  const response = await fetch(new URL("/sitemap.xml", baseUrl));
  assert.equal(response.status, 200, `/sitemap.xml returned ${response.status}`);
  const sitemap = await response.text();

  assert.match(
    sitemap,
    /\/webseitecheck<\/loc>/,
    "sitemap missing /webseitecheck",
  );
  assert.doesNotMatch(
    sitemap,
    /\/baustellencheck<\/loc>/,
    "sitemap still contains /baustellencheck",
  );
  assert.doesNotMatch(
    sitemap,
    /\/webseitecheck\/danke<\/loc>/,
    "sitemap contains thank-you page",
  );

  for (const [pathname] of landingPages) {
    assert.match(
      sitemap,
      new RegExp(`${escapeRegExp(pathname)}<\\/loc>`),
      `sitemap missing ${pathname}`,
    );
  }
}

async function assertRobotsAllowsAiSearch() {
  const response = await fetch(new URL("/robots.txt", baseUrl));
  assert.equal(response.status, 200, `/robots.txt returned ${response.status}`);
  const robots = await response.text();

  assert.match(
    robots,
    /User-Agent:\s*OAI-SearchBot/i,
    "robots.txt missing OAI-SearchBot rule",
  );
  assert.doesNotMatch(
    robots,
    /Disallow:\s*\/\s*$/im,
    "robots.txt blocks crawling at root",
  );
}

async function assertLandingPages() {
  for (const [pathname, h1] of landingPages) {
    const response = await fetch(new URL(pathname, baseUrl));
    assert.equal(response.status, 200, `${pathname} returned ${response.status}`);
    const html = await response.text();

    assert.match(
      html,
      new RegExp(escapeRegExp(h1)),
      `${pathname} missing H1 text`,
    );
    assert.match(
      html,
      /Kurz gesagt/,
      `${pathname} missing compact answer section`,
    );
    assert.match(
      html,
      /application\/ld\+json/,
      `${pathname} missing JSON-LD script`,
    );
    assert.match(
      html,
      /"@type":"FAQPage"/,
      `${pathname} missing FAQPage schema`,
    );
    assert.match(
      html,
      new RegExp(`rel="canonical" href="[^"]*${escapeRegExp(pathname)}`),
      `${pathname} missing self canonical`,
    );
    assert.doesNotMatch(
      html,
      /noindex/i,
      `${pathname} contains noindex`,
    );
  }
}

const checks = [
  ["/", "Deine digitalen"],
  ["/webseitecheck", "Kostenloser Kurzcheck für Websites"],
  ["/webseitecheck/danke", "Deine Baustelle ist eingetragen"],
  [`/blog/${pinnedBlogSlug}`, "class=\"mdx-body\""],
  [`/projekte/${DEFAULT_PROJECT_SLUG}`, "class=\"section-shell\""],
  ["/impressum", "Sigmaringer Str. 27"],
  ["/datenschutz", "Datenschutzerklärung"],
];

for (const [pathname, expected] of checks) {
  const response = await fetch(new URL(pathname, baseUrl));
  assert.equal(response.status, 200, `${pathname} returned ${response.status}`);
  const html = await response.text();
  assert.match(html, new RegExp(expected), `${pathname} missing ${expected}`);
}

const blogDetailPath = `/blog/${pinnedBlogSlug}`;
const blogDetailResponse = await fetch(new URL(blogDetailPath, baseUrl));
assert.equal(blogDetailResponse.status, 200, `${blogDetailPath} returned ${blogDetailResponse.status}`);
const blogDetailHtml = await blogDetailResponse.text();
assert.match(
  blogDetailHtml,
  /class="mdx-body"/,
  `${blogDetailPath} missing article content wrapper`,
);
if (richPattern) {
  assert.match(
    blogDetailHtml,
    new RegExp(richPattern),
    `${blogDetailPath} missing expected rich content pattern`,
  );
}

await assertRedirect("/baustellencheck", "/webseitecheck");
await assertRedirect("/baustellencheck/danke", "/webseitecheck/danke");
await assertSitemapRoutes();
await assertRobotsAllowsAiSearch();
await assertLandingPages();

const baustellencheckResponse = await fetch(new URL("/webseitecheck", baseUrl));
assert.equal(
  baustellencheckResponse.status,
  200,
  `/webseitecheck returned ${baustellencheckResponse.status}`,
);
const baustellencheckHtml = await baustellencheckResponse.text();
assert.match(
  baustellencheckHtml,
  /Baustellencheck starten/,
  "/webseitecheck missing updated primary CTA",
);
assert.match(
  baustellencheckHtml,
  /Was wir prüfen/,
  "/webseitecheck missing focused inspection section",
);
assert.doesNotMatch(
  baustellencheckHtml,
  /Sieben Stellen/,
  "/webseitecheck still exposes the old long inspection framing",
);
assert.match(
  baustellencheckHtml,
  /Website Check \| STACKWERKHAUS Baustellencheck/,
  "/webseitecheck missing updated metadata title",
);

const dankeResponse = await fetch(new URL("/webseitecheck/danke", baseUrl));
assert.equal(
  dankeResponse.status,
  200,
  `/webseitecheck/danke returned ${dankeResponse.status}`,
);
const dankeHtml = await dankeResponse.text();
assert.match(
  dankeHtml,
  /Was jetzt passiert/,
  "/webseitecheck/danke missing next-step framing",
);
assert.match(
  dankeHtml,
  /Wir ordnen den Bauzustand ein/,
  "/webseitecheck/danke missing Bauzustand step",
);
assert.doesNotMatch(
  dankeHtml,
  /Willst du den vollständigen Befund/,
  "/webseitecheck/danke still leads with audit upsell",
);

console.log(
  "Smoke test passed for",
  checks.map(([pathname]) => pathname).concat(landingPages.map(([pathname]) => pathname)).join(", "),
);

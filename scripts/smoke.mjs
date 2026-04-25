import assert from "node:assert/strict";
import { DEFAULT_BLOG_SLUG, DEFAULT_PROJECT_SLUG } from "./fixtures/content-slugs.mjs";

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";
const pinnedBlogSlug = process.env.SMOKE_BLOG_SLUG || DEFAULT_BLOG_SLUG;
const richPattern = process.env.SMOKE_BLOG_RICH_PATTERN;

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
}

const checks = [
  ["/", "Deine digitalen"],
  ["/webseitecheck", "Ist deine Website"],
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

console.log(
  "Smoke test passed for",
  checks.map(([pathname]) => pathname).join(", "),
);

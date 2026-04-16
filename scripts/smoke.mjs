import assert from "node:assert/strict";

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";
const checks = [
  ["/", "Deine digitalen"],
  ["/blog", "Blog, Analysen"],
  ["/projekte/zynapse", "Zynapse"],
];

for (const [pathname, expected] of checks) {
  const response = await fetch(new URL(pathname, baseUrl));
  assert.equal(response.status, 200, `${pathname} returned ${response.status}`);
  const html = await response.text();
  assert.match(html, new RegExp(expected), `${pathname} missing ${expected}`);
}

const blogIndexResponse = await fetch(new URL("/blog", baseUrl));
assert.equal(blogIndexResponse.status, 200, "/blog returned non-200 during detail lookup");
const blogIndexHtml = await blogIndexResponse.text();
const firstBlogLink = blogIndexHtml.match(/href="\/blog\/([^"/?#]+)"/);
assert.ok(firstBlogLink, "blog index did not expose a blog detail link");

const firstBlogSlug = firstBlogLink?.[1];
assert.ok(firstBlogSlug, "could not parse first blog slug");
const blogDetailPath = `/blog/${firstBlogSlug}`;
const blogDetailResponse = await fetch(new URL(blogDetailPath, baseUrl));
assert.equal(blogDetailResponse.status, 200, `${blogDetailPath} returned ${blogDetailResponse.status}`);
const blogDetailHtml = await blogDetailResponse.text();
assert.match(
  blogDetailHtml,
  /class="mdx-body"|<article class="section-shell">/,
  `${blogDetailPath} missing article shell`,
);

console.log(
  "Smoke test passed for",
  [...checks.map(([pathname]) => pathname), blogDetailPath].join(", "),
);

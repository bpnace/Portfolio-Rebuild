import assert from "node:assert/strict";

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";

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

const blogIndexHtml = await fetchHtml("/blog");
const firstBlogLink = blogIndexHtml.match(/href="\/blog\/([^"/?#]+)"/);
assert.ok(firstBlogLink, "blog index did not expose a blog detail link");

const firstBlogSlug = firstBlogLink?.[1];
assert.ok(firstBlogSlug, "could not parse first blog slug");
const blogDetailHtml = await fetchHtml(`/blog/${firstBlogSlug}`);
assert.match(
  blogDetailHtml,
  /class="mdx-body"|<article class="section-shell">/,
  "blog detail page missing article content shell",
);

const projectHtml = await fetchHtml("/projekte/zynapse");
assert.match(
  projectHtml,
  /class="section-shell"/,
  "project detail page missing section shell",
);

console.log(
  "Mobile smoke passed for /, /blog, /blog/" +
    firstBlogSlug +
    ", /projekte/zynapse",
);

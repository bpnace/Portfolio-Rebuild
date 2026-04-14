import assert from "node:assert/strict";

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";
const checks = [
  ["/", "Deine digitalen"],
  ["/blog", "Blog, Analysen"],
  ["/blog/was-kostet-eine-website-2026", "Was kostet eine Website 2026?"],
  ["/projekte/zynapse", "Zynapse"],
];

for (const [pathname, expected] of checks) {
  const response = await fetch(new URL(pathname, baseUrl));
  assert.equal(response.status, 200, `${pathname} returned ${response.status}`);
  const html = await response.text();
  assert.match(html, new RegExp(expected), `${pathname} missing ${expected}`);
}

console.log("Smoke test passed for", checks.map(([pathname]) => pathname).join(", "));

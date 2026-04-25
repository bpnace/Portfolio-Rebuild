import test from "node:test";
import assert from "node:assert/strict";
import {
  buildBaustellencheckSummary,
  buildForwardedBaustellencheckPayload,
  normalizeWebsiteUrl,
  validateBaustellencheckPayload,
} from "../lib/baustellencheck.mjs";

const validPayload = {
  name: "Arthur Marshall",
  email: "arthur@example.com",
  websiteUrl: "stackwerkhaus.de",
  currentState: "old-needs-renovation",
  goals: ["more-inquiries", "clear-offers"],
  company: "Codariq",
  message: "Die Startseite wirkt gerade nicht klar genug.",
  terms: true,
  newsletterOptIn: false,
  website: "",
};

test("normalizes website URLs without requiring visitors to type a protocol", () => {
  assert.equal(
    normalizeWebsiteUrl("stackwerkhaus.de"),
    "https://stackwerkhaus.de",
  );
  assert.equal(
    normalizeWebsiteUrl("https://stackwerkhaus.de/relaunch/#kontakt"),
    "https://stackwerkhaus.de/relaunch",
  );
  assert.equal(normalizeWebsiteUrl("mailto:test@example.com"), "");
  assert.equal(normalizeWebsiteUrl("javascript:alert(1)"), "");
  assert.equal(normalizeWebsiteUrl("not-a-domain"), "");
});

test("validates required Baustellencheck fields and blocks honeypot submissions", () => {
  const valid = validateBaustellencheckPayload(validPayload);
  assert.equal(valid.ok, true);
  assert.equal(valid.data.websiteUrl, "https://stackwerkhaus.de");
  assert.deepEqual(valid.data.goalLabels, [
    "Mehr Anfragen",
    "Angebote klarer erklären",
  ]);

  const missing = validateBaustellencheckPayload({
    ...validPayload,
    websiteUrl: "",
    currentState: "",
    goals: [],
    terms: false,
  });
  assert.equal(missing.ok, false);
  assert.ok(missing.errors.websiteUrl);
  assert.ok(missing.errors.currentState);
  assert.ok(missing.errors.goals);
  assert.ok(missing.errors.terms);

  const spam = validateBaustellencheckPayload({
    ...validPayload,
    website: "https://spam.example",
  });
  assert.equal(spam.ok, false);
  assert.ok(spam.errors.website);
});

test("builds a compact summary and structured webhook payload", () => {
  const validation = validateBaustellencheckPayload({
    ...validPayload,
    newsletterOptIn: true,
  });
  assert.equal(validation.ok, true);

  const summary = buildBaustellencheckSummary(validation.data);
  assert.match(summary, /Stackwerkhaus Webseitecheck/);
  assert.match(summary, /Zustand: Sie ist alt und müsste saniert werden/);
  assert.match(summary, /Newsletter: Ja/);

  const forwardedPayload = buildForwardedBaustellencheckPayload(
    validation.data,
    {
      submitted_at: "2026-04-25T12:00:00.000Z",
      page_url: "https://stackwerkhaus.de/baustellencheck",
      page_title: "Website Check für Webdesign und Relaunch | STACKWERKHAUS",
      origin: "STACKWERKHAUS Webseitecheck",
    },
  );
  assert.equal(forwardedPayload.lead_type, "baustellencheck");
  assert.equal(forwardedPayload.website_url, "https://stackwerkhaus.de");
  assert.equal(forwardedPayload.website, "");
  assert.match(forwardedPayload.message, /Stackwerkhaus Webseitecheck/);
  assert.match(forwardedPayload.visitor_message, /Startseite wirkt/);
  assert.equal(forwardedPayload.newsletter_opt_in, true);
  assert.deepEqual(forwardedPayload.goals, [
    "more-inquiries",
    "clear-offers",
  ]);
  assert.match(forwardedPayload.summary, /Angebote klarer erklären/);
});

test("forwards a contact-style message even when visitors leave the note empty", () => {
  const validation = validateBaustellencheckPayload({
    ...validPayload,
    message: "",
  });
  assert.equal(validation.ok, true);

  const forwardedPayload = buildForwardedBaustellencheckPayload(
    validation.data,
  );

  assert.match(forwardedPayload.message, /Stackwerkhaus Webseitecheck/);
  assert.match(forwardedPayload.message, /Website: https:\/\/stackwerkhaus.de/);
  assert.equal(forwardedPayload.visitor_message, "");
});

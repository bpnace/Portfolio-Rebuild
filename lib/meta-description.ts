export const MIN_META_DESCRIPTION_LENGTH = 25;
export const MAX_META_DESCRIPTION_LENGTH = 160;

function normalizeDescription(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function trimToWordBoundary(value: string) {
  const limit = MAX_META_DESCRIPTION_LENGTH - 1;
  const cutIndex = value.lastIndexOf(" ", limit);
  const trimmed = value
    .slice(0, cutIndex > MIN_META_DESCRIPTION_LENGTH ? cutIndex : limit)
    .replace(/[\s,:;–-]+$/g, "")
    .trim();

  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

export function toMetaDescription(value: string, fallback = "") {
  const description = normalizeDescription(value || fallback);

  if (description.length <= MAX_META_DESCRIPTION_LENGTH) {
    return description;
  }

  const sentences = description.match(/[^.!?]+[.!?]+/g) ?? [];
  let candidate = "";

  for (const sentence of sentences) {
    const next = normalizeDescription(`${candidate} ${sentence}`);
    if (next.length > MAX_META_DESCRIPTION_LENGTH) {
      break;
    }

    candidate = next;
  }

  if (candidate.length >= MIN_META_DESCRIPTION_LENGTH) {
    return candidate;
  }

  return trimToWordBoundary(description);
}

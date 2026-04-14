# Stackwerkhaus

Next.js 16 App Router rebuild of the Stackwerkhaus marketing site.

## Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `GSAP` + `@gsap/react`
- local MDX content via `next-mdx-remote/rsc`
- contact delivery boundary prepared for `Resend`

## Commands

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm test:content
pnpm test:smoke
```

## Environment

Copy `.env.example` and fill only what you need:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`

If `RESEND_API_KEY` is missing, the contact route stays in validation-only preview mode and returns a non-failing preview response instead of sending email.

If `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is missing, analytics stays disabled locally and in preview.

## Notes

- The homepage and routed content use German copy by default.
- Blog posts and project entries live under `content/blog` and `content/projects`.
- GSAP motion is isolated to client islands and reduced-motion safe fallbacks are included.

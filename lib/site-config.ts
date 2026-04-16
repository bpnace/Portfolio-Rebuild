export const siteConfig = {
  name: "STACKWERKHAUS",
  title: "STACKWERKHAUS – Moderne Websites für Dienstleister und Unternehmen",
  description:
    "Webdesign, Frontend-Entwicklung und technisches SEO aus einer Hand. Für Dienstleister, Selbstständige und neue Marken, die mit einer modernen Website überzeugender auftreten.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://stackwerkhaus.de",
  email: "info@stackwerkhaus.de",
  location: "Berlin / Remote",
  founder: "Arthur Marshall",
  socialLinks: [
    {
      label: "Instagram",
      href: "https://instagram.com/stackwerkhaus",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/Arthur-arthur-marshall",
    },
  ],
  navigation: [
    { label: "Projekte", href: "/#projekte" },
    { label: "Leistungen", href: "/#leistungen" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Kontakt", href: "/#kontakt" },
  ],
} as const;

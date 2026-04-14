export const siteConfig = {
  name: "STACKWERKHAUS",
  title: "STACKWERKHAUS – Moderne Websites für Dienstleister und Unternehmen",
  description:
    "Webdesign, Frontend-Entwicklung und technisches SEO aus einer Hand. Für Dienstleister, Selbstständige und neue Marken, die mit einer modernen Website überzeugender auftreten.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://stackwerkhaus.de",
  email: "info@stackwerkhaus.de",
  location: "Berlin / Remote",
  founder: "Tarik Marshall",
  socialLinks: [
    {
      label: "Instagram",
      href: "https://instagram.com/stackwerkhaus",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/stackwerkhaus",
    },
  ],
  navigation: [
    { label: "Leistungen", href: "/#leistungen" },
    { label: "Projekte", href: "/#projekte" },
    { label: "FAQ", href: "/#faq" },
    { label: "Kontakt", href: "/#kontakt" },
    { label: "Blog", href: "/blog" },
  ],
} as const;

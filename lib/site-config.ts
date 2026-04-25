export const siteConfig = {
  name: "STACKWERKHAUS",
  title: "STACKWERKHAUS | Webdesign und Full Stack Development mit Stil.",
  description:
    "Wir bauen Websites, Web Apps und digitale Auftritte, bei denen Fassade, Grundriss und Technik zusammenpassen. Für Unternehmen, die online nicht nach einem Rohbau aussehen wollen.",
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
      href: "https://www.linkedin.com/in/tarik-arthur-marshall",
    },
  ],
  navigation: [
    { label: "Projekte", href: "/#projekte" },
    { label: "Leistungen", href: "/#leistungen" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Kontakt", href: "/#kontakt" },
  ],
} as const;

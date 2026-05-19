import type { Metadata } from "next";
import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import { stringifyJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site-config";

const pagePath = "/templates";
const pageTitle = "Templates | STACKWERKHAUS";
const pageDescription =
  "Template Start von Stackwerkhaus: Website-Vorlagen mit angepassten Farben, Logo, Schriftbild, vorhandenen Inhalten, Kontaktformular, Hosting und SEO-Grundsetup.";
const pageUrl = `${siteConfig.url}${pagePath}`;

const templateIncludes = [
  "Auswahl aus einer vorbereiteten Website-Struktur",
  "Anpassung an deine Farben, dein Logo und ein passendes Schriftbild",
  "Einpflege vorhandener Texte, Bilder und Kontaktdaten",
  "leichte Strukturierung für Startseite und wenige Unterseiten",
  "responsive Umsetzung, Kontaktformular und SEO-Grundsetup",
  "Hosting, SSL und E-Mail-Grundsetup",
] as const;

const templateCards = [
  {
    kicker: "Template 01",
    title: "Service Start",
    description:
      "Für lokale Dienstleister, Beratungen und kleine Unternehmen, die schnell erklären müssen, was sie anbieten und wie man anfragt.",
  },
  {
    kicker: "Template 02",
    title: "Praxis & Termin",
    description:
      "Für Angebote mit Vertrauen, Öffnungszeiten, Leistungen und einem schnellen Kontaktweg.",
  },
  {
    kicker: "Template 03",
    title: "Projekt & Profil",
    description:
      "Für Gründer, Solo-Studios und kleine Marken, die persönlicher auftreten und trotzdem schlank starten wollen.",
  },
] as const;

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: pagePath,
    siteName: siteConfig.name,
    title: pageTitle,
    description: pageDescription,
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function TemplatesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "de-DE",
        isPartOf: {
          "@id": `${siteConfig.url}#website`,
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: templateCards.map((template, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: template.title,
            description: template.description,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Templates",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="section-space">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(structuredData),
        }}
      />
      <div className="section-shell">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.58fr)] lg:items-end">
          <div className="max-w-5xl space-y-5">
            <div className="eyebrow">Template Start</div>
            <h1 className="display-lg max-w-[12ch]">
              Vorlagen für den schnellen Einstieg
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted">
              Du wählst ein Grundgerüst. Ich passe Farben, Logo, Schriftbild
              und vorhandene Inhalte an dein Angebot an. So startet die Website
              schneller und günstiger, ohne nach Baukasten von der Stange
              auszusehen.
            </p>
          </div>
          <div className="border-y border-border py-5">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-muted">
              Startpunkt
            </div>
            <p className="mt-3 text-3xl font-black leading-[0.98] tracking-normal text-foreground md:text-5xl">
              29 €/Monat plus Festpreis ab 799 €
            </p>
          </div>
        </section>

        <section className="mt-16 grid gap-8 border-y border-border py-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
          <div>
            <div className="eyebrow text-foreground/75">Enthalten</div>
            <h2 className="mt-4 max-w-xl text-3xl font-black leading-[0.98] tracking-normal text-foreground md:text-5xl">
              Was im Template Start enthalten ist
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
              Texte können leicht sortiert und geglättet werden. Vollständige
              Texterstellung, neues Branding, Shop, Blog, CMS, Animationen und
              komplexere Logik gehören in ein größeres Paket oder ein separates
              Angebot.
            </p>
          </div>
          <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {templateIncludes.map((item) => (
              <li key={item} className="border-t border-border pt-4">
                <span className="flex gap-3 text-sm leading-6 text-muted">
                  <span aria-hidden className="text-foreground">
                    +
                  </span>
                  <span>{item}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <div className="max-w-4xl space-y-4">
            <div className="eyebrow">Template-Galerie</div>
            <h2 className="text-4xl font-black leading-[0.96] tracking-normal text-foreground md:text-6xl">
              Drei Richtungen, Screenshots folgen.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
              Die ersten Screenshots kommen später. Die Platzhalter zeigen
              schon, welche Einstiege vorbereitet werden.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {templateCards.map((template) => (
              <article
                key={template.title}
                className="flex min-h-[30rem] flex-col border-t border-border py-6"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.28em] text-muted">
                  {template.kicker}
                </div>
                <div className="mt-5 grid min-h-[12rem] place-items-center border border-border bg-surface text-center">
                  <p className="max-w-[18ch] px-5 text-sm font-black uppercase leading-6 tracking-[0.18em] text-muted">
                    Vorschau folgt. Hier kommt ein Screenshot der Vorlage rein.
                  </p>
                </div>
                <div className="mt-6 flex flex-1 flex-col">
                  <h3 className="text-3xl font-black leading-[0.98] tracking-normal text-foreground">
                    {template.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-muted">
                    {template.description}
                  </p>
                  <HashLink
                    href="/?angebot=template-start#kontakt"
                    className="link-arrow mt-auto w-full justify-between border border-border px-4 py-4 text-foreground hover:border-foreground/45"
                  >
                    <LinkRippleText text="Template anfragen" baseWeight={560} />
                    <span aria-hidden>+</span>
                  </HashLink>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

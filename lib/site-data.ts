export const tickerItems = [
  "Technisches SEO",
  "Informationsarchitektur",
  "AEO-fähig",
  "Semantische Inhalte",
  "Crawlbare Struktur",
  "Schnelle Ladezeiten",
];

export const services = [
  {
    number: "01",
    title: "Webdesign",
    description:
      "Individuelle Websites, die Besucher in Anfragen verwandeln. Wir gestalten Struktur, Nutzerführung und visuelle Sprache so, dass dein Angebot sofort verstanden wird.",
  },
  {
    number: "02",
    title: "Entwicklung",
    description:
      "Sauberer Frontend-Code auf einem wartbaren Fundament. Kein Plugin-Chaos, keine unnötige Abhängigkeit, sondern eine schnelle und robuste Website.",
  },
  {
    number: "03",
    title: "Relaunch",
    description:
      "Bestehende Seiten werden neu geordnet, modernisiert und technisch stabilisiert, ohne die bisherige Sichtbarkeit leichtfertig zu riskieren.",
  },
  {
    number: "04",
    title: "SEO",
    description:
      "Technisches SEO, klare Informationsarchitektur und Inhalte, die für Google wie für KI-Antworten sauber lesbar und indexierbar bleiben.",
  },
] as const;

export const skills = [
  "Positionierung & Angebotslogik",
  "Website-Struktur",
  "Webdesign",
  "Content-Führung",
  "Relaunch",
  "Technisches SEO",
  "Performance",
  "Frontend-Entwicklung",
  "Barrierearme Patterns",
  "Launch-Begleitung",
  "Analytics-Grundsetup",
  "Wartung & Support",
] as const;

export const experience = [
  {
    title: "Stackwerkhaus",
    years: "2018 – heute",
    role: "Webdesign & Frontend",
    place: "Berlin",
  },
  {
    title: "Freelance",
    years: "2015 – 2018",
    role: "UI/UX Design",
    place: "Berlin",
  },
  {
    title: "Digitalagentur",
    years: "2013 – 2015",
    role: "Frontend-Entwicklung",
    place: "Berlin",
  },
  {
    title: "Mediendesign-Studium",
    years: "2010 – 2013",
    role: "Interaktionsdesign",
    place: "Berlin",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Den gesamten Relaunch hat Tarik eigenständig durchgezogen – von Konzept bis Launch. Das Ergebnis ist deutlich ästhetischer, komplett responsive und klarer im Angebot.",
    name: "Leonie",
    company: "Geschäftsführerin bei ginione",
  },
  {
    quote:
      "Tarik verbindet technische Exzellenz mit einem sehr guten Verständnis für Business-Anforderungen. Genau diese Mischung hat unser Projekt deutlich beschleunigt.",
    name: "Denis",
    company: "Partner bei Immo-Pal",
  },
  {
    quote:
      "Die Zusammenarbeit war unkompliziert und das Ergebnis hat unsere Erwartungen übertroffen. Endlich eine Website, die zu unserem Angebot passt.",
    name: "Sarah",
    company: "Inhaberin, Atelier Heimat",
  },
] as const;

export const pricingTiers = [
  {
    name: "Starter",
    price: "899",
    description:
      "Fokussierte Website für Einzelunternehmer und Dienstleister.",
    timeline: "3 Wochen",
    pages: "5 Seiten",
    features: [
      "Individuelles Design",
      "Responsive Umsetzung",
      "Technisches SEO-Grundsetup",
      "DSGVO-Basis",
      "Kontaktformular",
      "Live-Schaltung & Übergabe",
    ],
  },
  {
    name: "Business",
    price: "1.499",
    description:
      "Professionelle Website mit Content-Bereich für wachsende Unternehmen.",
    timeline: "4 Wochen",
    pages: "bis 8 Seiten",
    highlight: true,
    features: [
      "Alles aus Starter",
      "Blog- oder Portfolio-Bereich",
      "Erweiterte SEO-Struktur",
      "Analytics-Setup",
      "Consent-orientierte Umsetzung",
      "Redaktionsfähige Inhalte",
    ],
  },
  {
    name: "Premium",
    price: "2.499",
    description:
      "Maßgeschneiderte Lösung mit Animationen und Integrationen.",
    timeline: "5–6 Wochen",
    pages: "10+ Seiten",
    features: [
      "Alles aus Business",
      "Custom GSAP Animationen",
      "CRM- oder Buchungsintegration",
      "Mehrsprachigkeit möglich",
      "Performance-Ziel 90+",
      "Launch-Support",
    ],
  },
] as const;

export const faqs = [
  {
    q: "Was kostet eine professionelle Website für ein kleines Unternehmen?",
    a: "Fokussierte Projekte starten ab 899 €. Der genaue Preis hängt vom Seitenumfang, den Inhalten und den Integrationen ab.",
  },
  {
    q: "Wie lange dauert ein Website-Projekt?",
    a: "Die meisten Projekte gehen in 3 bis 6 Wochen live. Entscheidend sind Freigaben, vorhandene Inhalte und ob ein Relaunch ansteht.",
  },
  {
    q: "Für wen ist Stackwerkhaus die richtige Wahl?",
    a: "Vor allem für Dienstleister, kleine Unternehmen und neue Marken, die eine Website mit klarer Nutzerführung und sauberer Technik brauchen.",
  },
  {
    q: "Was ist im Projekt normalerweise enthalten?",
    a: "Struktur, Copy-Führung, Design, Frontend-Umsetzung, Responsive-Optimierung, technisches SEO-Grundsetup und ein sauberer Launch.",
  },
  {
    q: "Kann ich Inhalte später selbst anpassen?",
    a: "Ja. Die Struktur ist so geplant, dass spätere Ergänzungen und neue Inhalte ohne Komplettumbau integriert werden können.",
  },
  {
    q: "Übernehmt ihr auch Relaunches bestehender Websites?",
    a: "Ja. Bestehende Inhalte werden neu geordnet, modernisiert und für Nutzer wie Suchmaschinen sinnvoller strukturiert.",
  },
] as const;

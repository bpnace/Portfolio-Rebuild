import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: {
    canonical: "/impressum",
  },
};

export default function ImpressumPage() {
  return (
    <main className="section-space">
      <div className="section-shell max-w-3xl space-y-6">
        <div className="eyebrow">Impressum</div>
        <h1 className="display-md">Impressum</h1>
        <div className="mdx-body">
          <p>
            Angaben gemäß § 5 TMG
          </p>

          <p>
            STACKWERKHAUS<br />
            Tarik Marshall<br />
            Sigmaringer Str. 27<br />
            10713 Berlin<br />
            Deutschland
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: <a href="tel:+4917631378294">+49 176 31378294</a><br />
            E-Mail: <a href="mailto:info@stackwerkhaus.de">info@stackwerkhaus.de</a><br />
            Website: <a href="https://stackwerkhaus.de">https://stackwerkhaus.de</a>
          </p>

          <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>
            Tarik Marshall<br />
            Sigmaringer Str. 27<br />
            10713 Berlin
          </p>

          <h2>EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            {" "}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>
            .
          </p>

          <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
    </main>
  );
}

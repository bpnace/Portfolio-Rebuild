import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  alternates: {
    canonical: "/datenschutz",
  },
};

export default function DatenschutzPage() {
  return (
    <main className="section-space">
      <div className="section-shell max-w-3xl space-y-6">
        <div className="eyebrow">Datenschutz</div>
        <h1 className="display-md">Datenschutz</h1>
        <div className="mdx-body">
          <p>
            Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Diese Datenschutzerklärung
            erläutert, welche Daten beim Besuch dieser Website verarbeitet werden, zu welchen
            Zwecken dies geschieht und welche Rechte Sie haben.
          </p>

          <h2>Verantwortlicher</h2>
          <p>
            STACKWERKHAUS<br />
            Tarik Marshall<br />
            Sigmaringer Str. 27<br />
            10713 Berlin<br />
            Deutschland
          </p>
          <p>
            E-Mail: <a href="mailto:info@stackwerkhaus.de">info@stackwerkhaus.de</a><br />
            Telefon: <a href="tel:+4917631378294">+49 176 31378294</a>
          </p>

          <h2>Server-Logfiles</h2>
          <p>
            Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter technisch notwendige
            Verbindungsdaten, etwa IP-Adresse, Zeitpunkt des Zugriffs, angeforderte Inhalte,
            Browserinformationen und Referrer. Die Verarbeitung erfolgt zur Sicherstellung des
            stabilen und sicheren Betriebs der Website.
          </p>

          <h2>Kontaktaufnahme</h2>
          <p>
            Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, verarbeiten wir
            die von Ihnen übermittelten Angaben zur Bearbeitung Ihrer Anfrage. Dazu gehören in der
            Regel Name, E-Mail-Adresse und die von Ihnen im Nachrichtenfeld mitgeteilten Inhalte.
          </p>
          <p>
            Wenn der Mailversand auf dieser Website aktiviert ist, erfolgt er über den Dienst
            Resend. Resend verarbeitet die Daten ausschließlich zur technischen Zustellung der
            Nachricht. Ohne aktivierten Mailversand bleibt die Anfrage in einer validierten
            Vorschau-Antwort und wird nicht extern versendet.
          </p>

          <h2>Einwilligungsmanagement</h2>
          <p>
            Auf der aktuellen STACKWERKHAUS-Website wird ein Consent-Tool von CCM19 eingesetzt, um
            Einwilligungen für optionale Technologien zu verwalten. In dieser Implementierung
            werden optionale Dienste nur dann geladen, wenn sie explizit konfiguriert und aktiviert
            sind.
          </p>

          <h2>Analyse und Reichweitenmessung</h2>
          <p>
            Sofern auf dieser Website ein datenschutzfreundliches Analytics-Setup aktiviert wird,
            erfolgt dies nur auf dokumentierter Konfigurationsbasis. In der vorliegenden
            Implementierung bleibt Analytics deaktiviert, solange keine entsprechende Domain in der
            Umgebung hinterlegt ist.
          </p>

          <h2>Externe Links und soziale Netzwerke</h2>
          <p>
            Diese Website verlinkt auf externe Angebote, insbesondere Instagram und LinkedIn. Beim
            Anklicken dieser Links verlassen Sie unsere Website. Für die Datenverarbeitung auf den
            jeweiligen Zielseiten sind ausschließlich deren Betreiber verantwortlich.
          </p>

          <h2>Ihre Rechte</h2>
          <p>
            Sie haben das Recht auf Auskunft über die betreffenden personenbezogenen Daten sowie auf
            Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit im
            gesetzlichen Rahmen. Außerdem können Sie erteilte Einwilligungen jederzeit mit Wirkung
            für die Zukunft widerrufen.
          </p>

          <h2>Beschwerderecht</h2>
          <p>
            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
            Ihrer personenbezogenen Daten zu beschweren.
          </p>

          <h2>Stand</h2>
          <p>Stand dieser Datenschutzerklärung: April 2026.</p>
        </div>
      </div>
    </main>
  );
}

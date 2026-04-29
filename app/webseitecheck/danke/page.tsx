import type { Metadata } from "next";
import { ThankYouPageTracker } from "@/components/baustellencheck/ThankYouPageTracker";
import { TrackedHashLink } from "@/components/analytics/TrackedHashLink";
import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

export const metadata: Metadata = {
  title: "Baustellencheck eingetragen",
  description:
    "Danke für deine Anfrage zum Stackwerkhaus Baustellencheck.",
  alternates: {
    canonical: "/webseitecheck/danke",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const nextLinks = [
  { label: "Leistungen ansehen", href: "/#leistungen" },
  { label: "Projektbeispiele ansehen", href: "/#projekte" },
] as const;

const nextSteps = [
  "Wir schauen uns deine Website an.",
  "Wir ordnen den Bauzustand ein.",
  "Du bekommst eine kurze Einschätzung per E-Mail.",
  "Wenn es sinnvoll ist, schlagen wir dir den passenden nächsten Bauauftrag vor.",
] as const;

export default function BaustellencheckDankePage() {
  return (
    <main className="pb-16 lg:pb-24">
      <ThankYouPageTracker />
      <div className="section-shell grid min-h-[calc(100svh-13rem)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:items-center">
        <div className="space-y-8">
          <div className="eyebrow text-foreground/75">
            Der Stackwerkhaus Baustellencheck
          </div>
          <div className="space-y-6">
            <h1 className="display-lg max-w-4xl">
              Deine Baustelle ist eingetragen.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted md:text-xl md:leading-9">
              Wir schauen uns deinen digitalen Bauzustand an und prüfen
              Fundament, Grundriss, Fassade und Kontaktwege. Du bekommst eine
              kurze Einschätzung mit konkreten Punkten, keine generische
              Massenanalyse und kein Baugeschwätz ohne Plan.
            </p>
          </div>
        </div>

        <aside className="border-t border-border pt-6">
          <div className="eyebrow font-bold text-foreground/75">Was jetzt passiert?</div>
          <p className="mt-5 text-base leading-7 text-muted">
            Der Check ist jetzt im System. Ab hier wird aus der Anfrage eine
            kleine Bauaufnahme mit klarer Richtung.
          </p>
          <ol className="mt-7 grid gap-3 text-sm leading-6 text-muted">
            {nextSteps.map((step, index) => (
              <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-border pt-3">
                <span className="text-[10px] uppercase tracking-[0.24em] text-foreground/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {nextLinks.map((item) => (
              <HashLink
                key={item.href}
                href={item.href}
                className="link-arrow w-full justify-between border border-border px-4 py-4 text-foreground hover:border-foreground"
              >
                <LinkRippleText text={item.label} baseWeight={620} />
                <span aria-hidden>+</span>
              </HashLink>
            ))}
            <TrackedHashLink
              href="/#kontakt"
              eventName="booking_click_after_check"
              eventParams={{ placement: "thank_you_direct_booking" }}
              className="link-arrow w-full justify-between bg-foreground px-4 py-4 text-background hover:bg-foreground/90"
            >
              <LinkRippleText text="Direkt Gespräch buchen" baseWeight={720} />
              <span aria-hidden>+</span>
            </TrackedHashLink>
          </div>
        </aside>
      </div>
    </main>
  );
}

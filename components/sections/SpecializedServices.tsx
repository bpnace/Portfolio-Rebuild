import { landingPages } from "@/lib/landing-pages";
import { HashLink } from "@/components/ui/HashLink";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SpecializedServices() {
  return (
    <section className="section-space border-t border-border">
      <div className="section-shell">
        <SectionHeader label="Leistungen" marker="(SKWKHS® — 03B)" />
        <div className="mb-10 max-w-5xl space-y-5 md:mb-14">
          <h2 className="display-md max-w-[14ch]">
            Spezialisierte Website Leistungen
          </h2>
          <p className="max-w-3xl text-lg leading-8 text-muted">
            Fünf klare Einstiege für konkrete Suchfragen: schnelle Website,
            kleines Unternehmen, Kampagne, Next.js oder Automatisierung. Keine
            losen SEO-Seiten, sondern zentrale Leistungsseiten mit sichtbarem
            Inhalt.
          </p>
        </div>

        <div className="grid border-y border-border md:grid-cols-2 xl:grid-cols-5">
          {landingPages.map((page, index) => (
            <HashLink
              key={page.path}
              href={page.path}
              className="group flex min-h-[17rem] flex-col justify-between border-border border-t p-6 first:border-t-0 md:border-l md:first:border-l-0 xl:border-t-0"
            >
              <span>
                <span className="eyebrow text-foreground/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-8 block text-2xl font-black leading-tight tracking-[-0.045em] text-foreground">
                  {page.homeTitle}
                </span>
              </span>
              <span className="mt-6 block text-sm leading-6 text-muted">
                {page.homeDescription}
              </span>
              <span
                aria-hidden
                className="mt-8 block text-foreground/50 transition group-hover:text-foreground"
              >
                +
              </span>
            </HashLink>
          ))}
        </div>
      </div>
    </section>
  );
}

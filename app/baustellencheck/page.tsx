import Image from "next/image";
import type { Metadata } from "next";
import { buildingResults, inspectionFields } from "@/lib/baustellencheck.mjs";
import { BaustellencheckForm } from "@/components/baustellencheck/BaustellencheckForm";
import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: {
    absolute: "Webseitecheck für Webdesign und Relaunch | STACKWERKHAUS",
  },
  description:
    "Prüfe deine Website mit dem Stackwerkhaus Webseitecheck. STACKWERKHAUS bewertet Struktur, Design, Technik und Kontaktwege und zeigt, ob dein Auftritt Penthouse, Plattenbau oder Rohbau ist.",
  alternates: {
    canonical: "/baustellencheck",
  },
  openGraph: {
    url: "/baustellencheck",
    title: "Webseitecheck für Webdesign und Relaunch | STACKWERKHAUS",
    description:
      "Prüfe deine Website mit dem Stackwerkhaus Webseitecheck. STACKWERKHAUS bewertet Struktur, Design, Technik und Kontaktwege und zeigt, ob dein Auftritt Penthouse, Plattenbau oder Rohbau ist.",
  },
};

export default function BaustellencheckPage() {
  return (
    <main>
      <section className="section-space pt-8 md:pt-0">
        <div className="section-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="space-y-8">
            <div className="eyebrow text-foreground/75">
              Der Stackwerkhaus Webseitecheck
            </div>
            <div className="space-y-6">
              <h1 className="max-w-[12ch] font-display text-[clamp(3.4rem,8vw,8rem)] font-black leading-[0.9] tracking-[-0.055em] md:max-w-[13.5ch] md:text-[clamp(4.2rem,7vw,7.2rem)] xl:max-w-[15ch]">
                <span className="block">Ist deine Website</span>
                <span className="block">Penthouse,</span>
                <span className="block">Plattenbau</span>
                <span className="block">oder Rohbau?</span>
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted md:text-xl md:leading-9">
                Wir prüfen Fundament, Grundriss, Fassade und Technik deines
                digitalen Auftritts und zeigen dir, wo dein Online-Bauwerk trägt
                und wo noch Baustelle ist.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <HashLink
                href="/baustellencheck#baustellencheck-form"
                className="link-arrow w-full justify-between bg-foreground px-5 py-4 text-background sm:w-fit"
              >
                <LinkRippleText
                  text="Webseitecheck starten"
                  baseWeight={760}
                />
                <span aria-hidden>+</span>
              </HashLink>
              <HashLink
                href="/baustellencheck#bauzustand"
                className="link-arrow w-full justify-between py-4 pr-5 pl-16 text-muted hover:text-foreground sm:w-fit sm:px-5"
              >
                <LinkRippleText
                  text="Gebäudeklassen ansehen"
                  baseWeight={560}
                />
                <span aria-hidden>+</span>
              </HashLink>
            </div>
          </div>

          <div className="relative aspect-[941/1672] w-full max-w-[24rem] justify-self-center overflow-hidden bg-surface md:max-w-[26rem] lg:-mt-4 lg:w-[21rem] lg:max-w-none lg:justify-self-end xl:-mt-6 xl:w-[23rem]">
            <Image
              src="/pagecheck1.png"
              alt="Stackwerkhaus Architekturkonzept als Bauplan-Grafik"
              fill
              priority
              sizes="(min-width: 1280px) 23rem, (min-width: 1024px) 21rem, (min-width: 768px) 26rem, 92vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section id="baustellencheck-form" className="section-space border-t border-border">
        <div className="section-shell">
          <SectionHeader label="Webseitecheck" marker="(CHECK — 01)" />
          <BaustellencheckForm />
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <SectionHeader label="Prüffelder" marker="(CHECK — 02)" />
          <div className="mb-10 max-w-4xl space-y-4 md:mb-14">
            <h2 className="display-md">
              Sieben Stellen, an denen Websites gern knirschen.
            </h2>
            <p className="text-lg leading-8 text-muted">
              Nicht jede Website braucht den Abrissbagger. Manchmal reicht ein
              besserer Grundriss, manchmal muss der Maschinenraum neu sortiert
              werden.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {inspectionFields.map((field, index) => (
              <article
                key={field.title}
                className="border-t border-border pt-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-black tracking-[-0.04em]">
                    {field.title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 min-h-14 text-sm leading-6 text-foreground/82">
                  {field.text}
                </p>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-muted">
                  {field.checks.map((check) => (
                    <li key={check} className="flex gap-3">
                      <span aria-hidden className="text-foreground">
                        +
                      </span>
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="bauzustand"
        className="section-space bg-[#f4eee5] text-[#111111]"
      >
        <div className="section-shell">
          <div className="mb-10 flex items-center justify-between gap-4 text-[length:var(--label)] uppercase tracking-[0.35em] text-black/52 md:mb-14">
            <span>© Gebäudeklassen</span>
            <span>(CHECK — 03)</span>
          </div>
          <div className="mb-10 max-w-4xl space-y-4 md:mb-14">
            <h2 className="display-md text-[#111111]">
              Kein trockener Score. Ein Bauzustand.
            </h2>
            <p className="text-lg leading-8 text-black/62">
              Am Ende steht keine Prozentzahl, sondern eine Einordnung, die du
              verstehst: Feinschliff, Ausbau, Relaunch oder Neubau.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-9 md:grid-cols-2">
            {buildingResults.map((result) => (
              <article
                key={result.title}
                className="border-t border-black/18 pt-6"
              >
                <div className="text-[11px] uppercase tracking-[0.3em] text-black/48">
                  {result.meaning}
                </div>
                <h3 className="mt-4 text-3xl font-black tracking-[-0.05em] md:text-5xl">
                  {result.title}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-7 text-black/64">
                  {result.text}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.24em] text-black/64">
                  {result.recommendations.map((recommendation) => (
                    <span key={recommendation}>{recommendation}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

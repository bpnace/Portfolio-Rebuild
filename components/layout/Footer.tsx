import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

export function Footer() {
  return (
    <footer className="border-t border-border bg-black">
      <div className="section-shell section-space space-y-12">
        <div className="flex flex-col gap-8 border-b border-border pb-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-[0.42em] text-foreground">
              {siteConfig.name}
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted">
              Digitale Bauwerke mit klarer Struktur, verständlicher Nutzerführung
              und sauberem technischen Fundament.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-[11px] uppercase tracking-[0.3em] text-muted">
            {siteConfig.socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="hover-weight-link hover:text-foreground"
              >
                <LinkRippleText text={item.label} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] uppercase tracking-[0.32em] text-muted">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover-weight-link hover:text-foreground"
              >
                <LinkRippleText text={item.label} />
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] uppercase tracking-[0.32em] text-muted md:justify-end">
            <Link href="/impressum" className="hover-weight-link hover:text-foreground">
              <LinkRippleText text="Impressum" />
            </Link>
            <Link href="/datenschutz" className="hover-weight-link hover:text-foreground">
              <LinkRippleText text="Datenschutz" />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-2 text-[11px] uppercase tracking-[0.32em] text-muted">
            <div>© {siteConfig.name} 2026 · {siteConfig.location}</div>
            <a href={`mailto:${siteConfig.email}`} className="hover-weight-link hover:text-foreground">
              <LinkRippleText text={siteConfig.email} />
            </a>
          </div>
          <div className="display-md max-w-xl md:text-right">
            Deine digitalen Architekten.
          </div>
        </div>
      </div>
    </footer>
  );
}

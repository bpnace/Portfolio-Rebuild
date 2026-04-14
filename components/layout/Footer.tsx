import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border bg-black/80">
      <div className="section-shell section-space grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <div className="space-y-6">
          <div className="eyebrow">© Stackwerkhaus</div>
          <div className="max-w-2xl display-md">
            Deine digitalen Architekten.
          </div>
          <p className="max-w-xl text-muted">
            Webdesign, Frontend-Entwicklung und technische Struktur für
            Dienstleister, kleine Unternehmen und neue Marken.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div className="space-y-4">
            <div className="eyebrow">Navigation</div>
            <nav className="space-y-3 text-sm uppercase tracking-[0.28em] text-muted">
              {siteConfig.navigation.map((item) => (
                <div key={item.href}>
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <div className="eyebrow">Kontakt & Recht</div>
            <div className="space-y-3 text-sm text-muted">
              <p>{siteConfig.location}</p>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                {siteConfig.email}
              </a>
              <div className="flex flex-col gap-3 pt-2">
                <Link href="/impressum" className="hover:text-foreground">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="hover:text-foreground">
                  Datenschutz
                </Link>
              </div>
              {siteConfig.socialLinks.map((item) => (
                <div key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-foreground">
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { skills } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Profile() {
  return (
    <section className="section-space">
      <div className="section-shell grid gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <SectionHeader label="Profil" marker="(SKWKHS® — 05)" />
          <div className="space-y-6">
            <div className="display-md">{siteConfig.founder}</div>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              Webdesigner und Frontend-Entwickler aus Berlin. Stackwerkhaus
              verbindet Positionierung, Inhaltsführung, Design und technische
              Umsetzung, damit Websites nicht nur präsent sind, sondern präziser
              führen.
            </p>
          </div>
        </div>

        <div className="grid gap-x-8 sm:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill} className="border-t border-border py-3 text-sm text-foreground/90">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

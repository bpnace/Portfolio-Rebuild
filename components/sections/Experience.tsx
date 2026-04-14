import { experience } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Experience() {
  return (
    <section className="section-space">
      <div className="section-shell">
        <SectionHeader label="Erfahrung" marker="(SKWKHS® — 06)" />
        <div className="space-y-4">
          {experience.map((entry) => (
            <article
              key={entry.title}
              className="grid gap-4 border-b border-border py-6 md:grid-cols-[1.1fr_180px_220px_120px] md:items-center"
            >
              <h3 className="text-2xl font-semibold tracking-tight">{entry.title}</h3>
              <div className="text-sm text-muted">{entry.years}</div>
              <div className="text-sm text-muted">{entry.role}</div>
              <div className="text-sm text-muted">{entry.place}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { pricingTiers } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingCard } from "@/components/ui/PricingCard";

export function Pricing() {
  return (
    <section className="section-space">
      <div className="section-shell">
        <SectionHeader label="Pakete" marker="(SKWKHS® — 08)" />
        <div className="mb-10 max-w-3xl space-y-4 md:mb-16">
          <h2 className="display-lg">Klare Pakete für einen sinnvollen Startpunkt.</h2>
          <p className="text-lg leading-8 text-muted">
            Jedes Projekt wird sauber zugeschnitten. Trotzdem helfen klare
            Pakete, Aufwand, Tiefe und Prioritäten schneller einzuordnen.
          </p>
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

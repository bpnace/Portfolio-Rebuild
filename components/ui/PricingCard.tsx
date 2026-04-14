import Link from "next/link";

type PricingCardProps = {
  name: string;
  price: string;
  description: string;
  timeline: string;
  pages: string;
  features: readonly string[];
  highlight?: boolean;
};

export function PricingCard({
  name,
  price,
  description,
  timeline,
  pages,
  features,
  highlight,
}: PricingCardProps) {
  return (
    <article
      className={`flex h-full flex-col border-t pt-6 ${highlight ? "border-foreground" : "border-border"}`}
    >
      <div className="space-y-4">
        <div className={`eyebrow ${highlight ? "text-foreground" : ""}`}>{name}</div>
        <div className="display-md">
          <span className="text-[0.45em] align-top">ab</span> {price}
          <span className="text-[0.25em] align-middle text-muted">€</span>
        </div>
        <p className="text-muted">{description}</p>
      </div>

      <div className="mt-8 grid gap-2 text-[11px] uppercase tracking-[0.3em] text-muted">
        <div>Dauer · {timeline}</div>
        <div>Umfang · {pages}</div>
      </div>

      <ul className="mt-8 space-y-3 text-sm text-foreground/88">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className="text-foreground">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link href="/#kontakt" className="link-arrow mt-10">
        Projekt anfragen <span aria-hidden>↘</span>
      </Link>
    </article>
  );
}

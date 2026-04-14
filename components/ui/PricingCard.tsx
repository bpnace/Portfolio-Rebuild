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
      className={`glass-card flex h-full flex-col p-6 md:p-8 ${highlight ? "border-highlight/60 bg-white/6" : ""}`}
    >
      <div className="space-y-4">
        <div className="eyebrow">{name}</div>
        <div className="display-md">
          <span className="text-[0.45em] align-top">ab</span> {price}
          <span className="text-[0.25em] align-middle text-muted">€</span>
        </div>
        <p className="text-muted">{description}</p>
      </div>

      <div className="mt-8 flex gap-3 text-sm text-muted">
        <span className="chip">{timeline}</span>
        <span className="chip">{pages}</span>
      </div>

      <ul className="mt-8 space-y-3 text-sm text-foreground/88">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className="text-highlight">•</span>
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

import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import type { PricingTier } from "@/lib/site-data";

type PricingCardProps = PricingTier;

export function PricingCard({
  slug,
  name,
  label,
  monthlyPrice,
  monthlySuffix,
  monthlyNote,
  oneTimePrice,
  oneTimeLabel,
  stripePaymentLink,
  description,
  ctaLabel,
  suitableFor,
  includes,
  visibleIncludes,
  highlight,
}: PricingCardProps) {
  const href = stripePaymentLink || `/?angebot=${encodeURIComponent(slug)}#kontakt`;
  const ctaText = stripePaymentLink ? `${name} starten` : ctaLabel;
  const ctaClassName = `link-arrow mt-6 w-full justify-between px-4 py-3 transition-opacity hover:opacity-80 ${
    highlight
      ? "bg-background text-foreground"
      : "bg-foreground text-background opacity-92"
  }`;

  return (
    <article
      className={`flex h-full flex-col border-t ${
        highlight
          ? "border-foreground bg-foreground px-5 pb-5 pt-6 text-background shadow-[0_0_0_1px_rgba(255,255,255,0.22)]"
          : "border-border py-6"
      }`}
    >
      <div className="min-h-[8.75rem] space-y-2">
        <div>
          <div
            className={`eyebrow ${
              highlight ? "font-black text-background/62" : ""
            }`}
          >
            {name}
          </div>
          <div
            className={`mt-2 w-fit border px-2 py-1 text-[10px] font-black uppercase leading-none tracking-[0.16em] ${
              highlight
                ? "border-background/18 text-background/58"
                : "border-border text-muted"
            }`}
          >
            {label}
          </div>
        </div>
        <p
          className={`max-w-[35ch] text-sm leading-6 ${
            highlight ? "text-background/68" : "text-muted"
          }`}
        >
          {description}
        </p>
      </div>

      <div className="mt-7">
        <div
          className={`text-5xl font-display font-black leading-none tracking-normal md:text-6xl xl:text-7xl ${
            highlight ? "text-background" : "text-foreground"
          }`}
        >
          <span
            className={`mr-2 text-[0.18em] font-sans font-medium tracking-normal ${
              highlight ? "text-background/56" : "text-muted"
            }`}
          >
            ab
          </span>
          {monthlyPrice}
          <span className="ml-1 text-[0.32em] tracking-normal">€</span>
          <span className="ml-2 align-baseline text-[0.2em] font-sans font-black uppercase tracking-normal">
            {monthlySuffix.replace("€/", "/")}
          </span>
        </div>
      </div>

      <div
        className={`mt-3 grid min-h-[3.25rem] content-start gap-1 text-[10px] uppercase leading-5 ${
          highlight ? "text-background/58" : "text-muted"
        }`}
      >
        <div className="tracking-[0.08em]">{monthlyNote}</div>
        {oneTimePrice ? (
          <div className="tracking-[0.08em]">
            {oneTimeLabel ? <span>{oneTimeLabel} </span> : null}
            <span
              className={`font-black ${
                highlight ? "text-background" : "text-foreground"
              }`}
            >
              {oneTimePrice}
            </span>
          </div>
        ) : null}
      </div>

      {stripePaymentLink ? (
        <a
          href={href}
          className={ctaClassName}
          rel="noopener noreferrer"
          target="_blank"
        >
          <LinkRippleText text={ctaText} baseWeight={560} />
          <span aria-hidden>+</span>
        </a>
      ) : (
        <HashLink href={href} className={ctaClassName}>
          <LinkRippleText text={ctaText} baseWeight={560} />
          <span aria-hidden>+</span>
        </HashLink>
      )}

      <div
        className={`mt-6 grid gap-5 border-t pt-5 text-sm leading-6 ${
          highlight
            ? "border-background/14 text-background/78"
            : "border-border/70 text-muted"
        }`}
      >
        <div>
          <div
            className={`text-[10px] font-black uppercase tracking-[0.24em] ${
              highlight ? "text-background/54" : "text-foreground/54"
            }`}
          >
            Geeignet für
          </div>
          <ul className="mt-3 space-y-2">
            {suitableFor.slice(0, 3).map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden>+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div
            className={`text-[10px] font-black uppercase tracking-[0.24em] ${
              highlight ? "text-background/54" : "text-foreground/54"
            }`}
          >
            Enthält
          </div>
          <ul className="mt-3 space-y-2">
            {includes.slice(0, visibleIncludes ?? 4).map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden>+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

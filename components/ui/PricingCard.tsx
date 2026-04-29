import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import type { PricingTier } from "@/lib/site-data";

type PricingCardProps = PricingTier;

export function PricingCard({
  name,
  price,
  originalPrice,
  discountLabel,
  description,
  ctaLabel,
  suitableFor,
  includes,
  visibleIncludes,
  highlight,
}: PricingCardProps) {
  return (
    <article
      className={`flex h-full flex-col border-t ${
        highlight
          ? "relative border-foreground bg-foreground px-5 pb-5 pt-6 text-background shadow-[0_0_0_1px_rgba(255,255,255,0.22)]"
          : "border-border py-6"
      }`}
    >
      {highlight ? (
        <span className="absolute right-0 bottom-full bg-foreground px-2.5 py-1.5 text-[10px] font-black leading-none uppercase tracking-[0.18em] text-background">
          Empfehlung
        </span>
      ) : null}
      <div className="min-h-[8.25rem] space-y-2 md:min-h-[7.25rem]">
        <div>
          <div
            className={`eyebrow ${
              highlight ? "font-black text-background/62" : ""
            }`}
          >
            {name}
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
          className={`text-[clamp(3rem,5.8vw,5.4rem)] font-display font-black leading-none tracking-[-0.07em] ${
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
          {price}
          <span className="ml-1 text-[0.34em] tracking-[-0.04em]"> €</span>
        </div>
      </div>

      <div
        className={`mt-2 grid min-h-[2.125rem] content-start gap-1 text-[10px] uppercase leading-5 ${
          highlight ? "text-background/58" : "text-muted"
        }`}
      >
        {originalPrice || discountLabel ? (
          <div className="tracking-[0.08em]">
            {originalPrice ? (
              <>
                <span>statt </span>
                <span className="line-through decoration-current">
                  {originalPrice} €
                </span>
              </>
            ) : null}
            {originalPrice && discountLabel ? <span> / </span> : null}
            {discountLabel ? (
              <span
                className={`font-black ${
                  highlight ? "text-background" : "text-foreground"
                }`}
              >
                {discountLabel}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <HashLink
        href={`/?paket=${encodeURIComponent(name)}#kontakt`}
        className={`link-arrow mt-6 w-full justify-between px-4 py-3 transition-opacity hover:opacity-80 ${
          highlight
            ? "bg-background text-foreground"
            : "bg-foreground text-background opacity-92"
        }`}
      >
        <LinkRippleText text={ctaLabel} baseWeight={560} />
        <span aria-hidden>+</span>
      </HashLink>

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

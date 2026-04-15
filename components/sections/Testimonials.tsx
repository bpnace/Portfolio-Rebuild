import { testimonials } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";

function getLedgerId(index: number) {
  return `(00${index + 1})`;
}

export function Testimonials() {
  return (
    <section id="stimmen" className="section-space overflow-clip">
      <div className="section-shell">
        <SectionHeader label="Stimmen aus Projekten" marker="(SKWKHS® — 06)" />

        <div className="mb-10 max-w-4xl space-y-4 md:mb-16">
          <h2 className="display-lg">
            Ergebnisse, die ruhiger wirken, aber härter arbeiten.
          </h2>
          <p className="text-lg leading-8 text-muted">
            Gute Websites werden selten mit großen Worten beschrieben. Eher mit
            Klarheit, Geschwindigkeit und dem Gefühl, dass plötzlich alles
            sinnvoller zusammenpasst.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/14" />
          <div className="pointer-events-none absolute inset-y-0 right-[8%] hidden w-px bg-white/6 lg:block" />

          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className="grid gap-8 border-b border-white/10 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[96px_minmax(220px,0.34fr)_minmax(0,1fr)] lg:gap-10"
              >
                <div className="flex items-start justify-between gap-4 text-[11px] uppercase tracking-[0.34em] text-white/34">
                  <span>{getLedgerId(index)}</span>
                  <span className="lg:hidden">Voice</span>
                </div>

                <div className="space-y-6 lg:border-r lg:border-white/10 lg:pr-8">
                  <div>
                    <h3 className="mt-3 font-display text-[clamp(2rem,5vw,3.8rem)] font-black uppercase leading-[0.84] tracking-[-0.07em] text-foreground">
                      {testimonial.name}
                    </h3>
                  </div>

                  <div className="grid gap-3 border-t border-white/10 pt-4 text-[11px] uppercase tracking-[0.3em] text-white/46">
                    <div>{testimonial.company}</div>
                    <div>{`Log ${index + 1} / verified project note`}</div>
                  </div>
                </div>

                <div className="space-y-6 lg:space-y-8">
                  <div className="grid gap-4 border-b border-white/10 pb-5 md:grid-cols-[minmax(120px,0.18fr)_minmax(0,1fr)] md:items-start">
                    <div className="text-[11px] uppercase tracking-[0.34em] text-white/34">
                      Statement*
                    </div>
                    <div className="max-w-[13ch] font-display text-[clamp(2.2rem,6vw,5.4rem)] font-black uppercase leading-[0.84] tracking-[-0.08em] text-foreground">
                      {testimonial.highlight}
                    </div>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(180px,0.42fr)] lg:items-end">
                    <p className="max-w-3xl text-base leading-8 text-foreground/84 md:text-lg">
                      “{testimonial.quote}”
                    </p>

                    <div className="space-y-2 text-[11px] uppercase tracking-[0.3em] text-white/38">
                      <div>Status / <b>Delivered</b></div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="grid gap-4 px-6 py-5 text-[11px] uppercase tracking-[0.32em] text-white/34 md:px-10 lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <span>(SKWKHS®)</span>
            <span>[Website, Frontend, Relaunch]</span>
          </div>
        </div>
      </div>
    </section>
  );
}

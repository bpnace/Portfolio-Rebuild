import { testimonials } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

export function Testimonials() {
  return (
    <section className="section-space">
      <div className="section-shell">
        <SectionHeader label="Stimmen aus Projekten" marker="(SKWKHS® — 07)" />
        <div className="mb-10 max-w-3xl space-y-4 md:mb-16">
          <h2 className="display-lg">Ergebnisse, die ruhiger wirken, aber härter arbeiten.</h2>
          <p className="text-lg leading-8 text-muted">
            Gute Websites werden selten mit großen Worten beschrieben. Eher mit
            Klarheit, Geschwindigkeit und dem Gefühl, dass plötzlich alles
            sinnvoller zusammenpasst.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

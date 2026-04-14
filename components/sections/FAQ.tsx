import { faqs } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQItem } from "@/components/ui/FAQItem";

export function FAQ() {
  return (
    <section id="faq" className="section-space">
      <div className="section-shell">
        <SectionHeader label="FAQ" marker="(SKWKHS® — 10)" />
        <div className="mb-10 max-w-3xl space-y-4 md:mb-16">
          <h2 className="display-lg">Fragen, die vor einer guten Entscheidung auftauchen.</h2>
          <p className="text-lg leading-8 text-muted">
            Kein Pitch, sondern die Punkte, die im Erstgespräch ohnehin auf den
            Tisch kommen. So lässt sich schneller klären, ob Umfang, Timing und
            Anspruch zusammenpassen.
          </p>
        </div>
        <div>
          {faqs.map((item) => (
            <FAQItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

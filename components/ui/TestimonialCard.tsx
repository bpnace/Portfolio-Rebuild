type TestimonialCardProps = {
  quote: string;
  name: string;
  company: string;
};

export function TestimonialCard({
  quote,
  name,
  company,
}: TestimonialCardProps) {
  return (
    <article className="glass-card h-full p-6 md:p-8">
      <p className="text-lg leading-8 text-foreground/90">“{quote}”</p>
      <div className="mt-8 border-t border-border pt-5">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-muted">{company}</div>
      </div>
    </article>
  );
}

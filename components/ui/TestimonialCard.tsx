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
    <article className="h-full border-t border-border pt-6">
      <p className="text-lg leading-8 text-foreground/92">“{quote}”</p>
      <div className="mt-8 pt-5">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-muted">{company}</div>
      </div>
    </article>
  );
}

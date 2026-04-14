type SectionHeaderProps = {
  label: string;
  marker: string;
};

export function SectionHeader({ label, marker }: SectionHeaderProps) {
  return (
    <div className="mb-10 flex items-center justify-between gap-4 border-b border-border pb-4 text-[length:var(--label)] uppercase tracking-[0.35em] text-muted md:mb-16">
      <span>© {label}</span>
      <span>{marker}</span>
    </div>
  );
}

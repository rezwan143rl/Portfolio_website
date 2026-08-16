export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index?: number;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 flex items-start gap-4">
      {index !== undefined && (
        <span className="mt-1 font-mono text-xs text-muted">{String(index).padStart(2, '0')}</span>
      )}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-signal">{eyebrow}</p>
        <h2 className="mt-2 font-display text-2xl font-medium text-text md:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p>}
      </div>
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-blueprint-grid px-6 py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-signal">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted">{body}</p>
    </div>
  );
}

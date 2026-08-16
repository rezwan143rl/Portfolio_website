import type { Metadata } from 'next';
import { SectionHeading } from '@/components/site/section-heading';
import { Reveal } from '@/components/site/reveal';
import { EmptyState } from '@/components/site/empty-state';
import { getRoadmapItems } from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Roadmap' };

const stages = [
  { key: 'now', label: 'Now' },
  { key: 'next', label: 'Next' },
  { key: 'future', label: 'Future' },
] as const;

export default async function RoadmapPage() {
  const items = await getRoadmapItems();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Reveal><SectionHeading index={1} eyebrow="Trajectory" title="Roadmap" description="Now, Next, Future — updated as priorities shift." /></Reveal>
      {items.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {stages.map((stage) => (
            <div key={stage.key}>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-signal">{stage.label}</p>
              <div className="space-y-3">
                {items.filter((i) => i.stage === stage.key).map((item) => (
                  <div key={item.id} className="rounded-lg border border-border bg-surface p-4">
                    <p className="text-sm text-text">{item.title}</p>
                    {item.description && <p className="mt-1 text-xs text-muted">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="Roadmap not published yet" body="Now, Next, and Future will fill in here once it's set from the dashboard." />
      )}
    </div>
  );
}

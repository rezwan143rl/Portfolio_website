import type { Metadata } from 'next';
import { SectionHeading } from '@/components/site/section-heading';
import { Reveal } from '@/components/site/reveal';
import { EmptyState } from '@/components/site/empty-state';
import { getJourneyEntries } from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Journey' };

export default async function JourneyPage() {
  const entries = await getJourneyEntries();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Reveal><SectionHeading index={1} eyebrow="Evolution" title="Journey" /></Reveal>
      {entries.length > 0 ? (
        <div className="space-y-8 border-l border-border pl-6">
          {entries.map((entry) => (
            <div key={entry.id} className="relative">
              <div className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-signal" />
              <p className="font-mono text-xs text-muted">{entry.year}</p>
              <p className="mt-1 font-display text-base text-text">{entry.title}</p>
              {entry.description && <p className="mt-2 text-sm text-muted">{entry.description}</p>}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="Story not written yet" body="This page will trace the path once entries are added." />
      )}
    </div>
  );
}

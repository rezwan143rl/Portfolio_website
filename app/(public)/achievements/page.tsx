import type { Metadata } from 'next';
import { SectionHeading } from '@/components/site/section-heading';
import { Reveal } from '@/components/site/reveal';
import { EmptyState } from '@/components/site/empty-state';
import { getAchievements } from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Achievements' };

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Reveal><SectionHeading index={1} eyebrow="Milestones" title="Achievements" /></Reveal>
      {achievements.length > 0 ? (
        <div className="space-y-4">
          {achievements.map((a) => (
            <div key={a.id} className="rounded-lg border border-border bg-surface p-5">
              <p className="font-mono text-xs text-muted">{a.date}</p>
              <p className="mt-1 font-display text-base text-text">{a.title}</p>
              {a.description && <p className="mt-2 text-sm text-muted">{a.description}</p>}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="Nothing logged yet" body="Milestones will show up here as they're reached." />
      )}
    </div>
  );
}

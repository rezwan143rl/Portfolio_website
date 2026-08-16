import type { Metadata } from 'next';
import { SectionHeading } from '@/components/site/section-heading';
import { Reveal } from '@/components/site/reveal';
import { EmptyState } from '@/components/site/empty-state';
import { Badge } from '@/components/ui/badge';
import { getSkills } from '@/lib/queries';
import type { Skill } from '@/lib/types/database';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Skills' };

const levelLabel: Record<Skill['level'], string> = {
  learning: 'Learning',
  familiar: 'Familiar',
  working_knowledge: 'Working knowledge',
  advanced: 'Advanced',
  building_with_it: 'Building with it',
};

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <SectionHeading
          index={1}
          eyebrow="Technology stack"
          title="Skills"
          description="Not percentages — an honest read on where each one actually stands."
        />
      </Reveal>
      {skills.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill.id} className="rounded-lg border border-border bg-surface p-5">
              <p className="font-display text-base text-text">{skill.name}</p>
              <Badge className="mt-2">{levelLabel[skill.level]}</Badge>
              {skill.description && <p className="mt-3 text-sm text-muted">{skill.description}</p>}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="Not populated yet" body="Skills will appear here once they're added from the dashboard." />
      )}
    </div>
  );
}

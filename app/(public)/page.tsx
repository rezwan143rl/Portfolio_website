import Link from 'next/link';
import { Hero } from '@/components/site/hero';
import { SectionHeading } from '@/components/site/section-heading';
import { ProjectCard } from '@/components/site/project-card';
import { EmptyState } from '@/components/site/empty-state';
import { Reveal } from '@/components/site/reveal';
import { Button } from '@/components/ui/button';
import {
  getSiteSettings,
  getFeaturedProjects,
  getAchievements,
  getRoadmapItems,
} from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [settings, projects, achievements, roadmap] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getAchievements(),
    getRoadmapItems(),
  ]);

  return (
    <>
      <Hero headline={settings.hero_headline} subline={settings.hero_subline} />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <SectionHeading index={1} eyebrow="Active systems" title="Currently" />
          <p className="max-w-2xl whitespace-pre-line text-base text-muted">
            {settings.currently_text}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <div className="flex items-end justify-between">
            <SectionHeading index={2} eyebrow="Builds" title="Featured projects" />
            <Link href="/projects" className="font-mono text-xs uppercase tracking-wide text-signal">
              View all →
            </Link>
          </div>
        </Reveal>
        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <EmptyState
              title="Workshop status: quiet"
              body="New builds are coming — projects get added here as they reach a state worth showing."
            />
          </Reveal>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <SectionHeading index={3} eyebrow="Milestones" title="Achievements" />
        </Reveal>
        {achievements.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {achievements.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.06}>
                <div className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-signal/30">
                  <p className="font-mono text-xs text-muted">{a.date}</p>
                  <p className="mt-2 font-display text-base text-text">{a.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <EmptyState
              title="Nothing logged yet"
              body="Milestones will show up here as they're reached — not before."
            />
          </Reveal>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <SectionHeading index={4} eyebrow="Trajectory" title="Roadmap" />
        </Reveal>
        {roadmap.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {(['now', 'next', 'future'] as const).map((stage, colIndex) => (
              <Reveal key={stage} delay={colIndex * 0.1}>
                <div className="relative">
                  <p className="mb-3 font-mono text-xs uppercase tracking-widest text-signal">{stage}</p>
                  {colIndex < 2 && (
                    <span className="absolute -right-2 top-1 hidden font-mono text-xs text-border md:block">→</span>
                  )}
                  <div className="space-y-3">
                    {roadmap
                      .filter((item) => item.stage === stage)
                      .map((item) => (
                        <div key={item.id} className="rounded-lg border border-border bg-surface p-4">
                          <p className="text-sm text-text">{item.title}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <EmptyState
              title="Roadmap not published yet"
              body="Now, Next, and Future will fill in here once it's set from the dashboard."
            />
          </Reveal>
        )}
        <div className="mt-8">
          <Button asChild variant="secondary">
            <Link href="/roadmap">See full roadmap</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

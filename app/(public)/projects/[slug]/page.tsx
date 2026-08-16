import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { getProjectBySlug } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  return { title: project?.name ?? 'Project' };
}

function Section({ title, children }: { title: string; children?: string | null }) {
  if (!children) return null;
  return (
    <div className="border-t border-border py-8 first:border-t-0">
      <h2 className="font-mono text-xs uppercase tracking-widest text-signal">{title}</h2>
      <p className="mt-3 whitespace-pre-line text-base text-muted">{children}</p>
    </div>
  );
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const links = [
    { label: 'GitHub', href: project.github_url },
    { label: 'Live demo', href: project.live_url },
    { label: 'Docs', href: project.docs_url },
    { label: 'Video', href: project.video_url },
  ].filter((l) => l.href);

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Badge>{project.status.replace('_', ' ')}</Badge>
      <h1 className="mt-4 font-display text-3xl font-medium text-text md:text-4xl">
        {project.name}
      </h1>
      <p className="mt-3 text-base text-muted">{project.short_description}</p>

      {project.technologies && project.technologies.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech.id}>{tech.name}</Badge>
          ))}
        </div>
      )}

      {links.length > 0 && (
        <div className="mt-6 flex gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href!}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-wide text-signal hover:underline"
            >
              {link.label} →
            </a>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Section title="Overview">{project.full_description}</Section>
        <Section title="Problem">{project.problem}</Section>
        <Section title="Solution">{project.solution}</Section>
        <Section title="My role">{project.my_role}</Section>
        <Section title="Challenges">{project.challenges}</Section>
        <Section title="What I learned">{project.what_i_learned}</Section>
        <Section title="Future improvements">{project.future_improvements}</Section>
      </div>
    </article>
  );
}

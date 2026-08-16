import type { Metadata } from 'next';
import { SectionHeading } from '@/components/site/section-heading';
import { Reveal } from '@/components/site/reveal';
import { ProjectCard } from '@/components/site/project-card';
import { EmptyState } from '@/components/site/empty-state';
import { getAllProjects } from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Projects' };

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <SectionHeading
          index={1}
          eyebrow="Builds"
          title="Projects"
          description="Case studies from software, automation, and engineering work — in progress and shipped."
        />
      </Reveal>
      {projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Workshop status: quiet"
          body="New builds are coming — projects get added here as they reach a state worth showing."
        />
      )}
    </div>
  );
}

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/types/database';

const statusLabel: Record<Project['status'], string> = {
  planned: 'Planned',
  in_progress: 'In progress',
  completed: 'Completed',
  archived: 'Archived',
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block overflow-hidden rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_0_40px_-15px_rgba(227,168,87,0.35)]"
    >
      {/* light sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="relative flex items-center justify-between">
        <Badge>{statusLabel[project.status]}</Badge>
        {project.featured && <span className="font-mono text-xs text-signal">★ featured</span>}
      </div>
      <h3 className="relative mt-4 font-display text-lg font-medium text-text group-hover:text-signal">
        {project.name}
      </h3>
      <p className="relative mt-2 text-sm text-muted">{project.short_description}</p>
      {project.technologies && project.technologies.length > 0 && (
        <div className="relative mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech.id}>{tech.name}</Badge>
          ))}
        </div>
      )}
    </Link>
  );
}

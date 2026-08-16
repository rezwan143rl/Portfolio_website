import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DeleteButton } from '@/components/admin/delete-button';
import { getAllProjects } from '@/lib/queries';
import { deleteProject } from './actions';

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-text">Projects</h1>
        <Button asChild>
          <Link href="/admin/projects/new">New project</Link>
        </Button>
      </div>

      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-surface">
        {projects.length === 0 && (
          <p className="p-6 text-sm text-muted">No projects yet — create the first one above.</p>
        )}
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-text">
                {project.name}{' '}
                {project.featured && <span className="text-signal">★</span>}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <Badge>{project.status.replace('_', ' ')}</Badge>
                <span className="text-xs text-muted">/{project.slug}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="secondary" size="sm">
                <Link href={`/admin/projects/${project.id}/edit`}>Edit</Link>
              </Button>
              <DeleteButton action={deleteProject.bind(null, project.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

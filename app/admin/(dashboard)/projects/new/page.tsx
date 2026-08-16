import { ProjectForm } from '@/components/admin/project-form';
import { getSkills } from '@/lib/queries';
import { createProject } from '../actions';

export default async function NewProjectPage() {
  const allSkills = await getSkills();

  return (
    <div>
      <h1 className="font-display text-2xl text-text">New project</h1>
      <div className="mt-6">
        <ProjectForm action={createProject} allSkills={allSkills} />
      </div>
    </div>
  );
}

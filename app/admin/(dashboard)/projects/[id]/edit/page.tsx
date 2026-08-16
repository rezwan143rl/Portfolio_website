import { notFound } from 'next/navigation';
import { ProjectForm } from '@/components/admin/project-form';
import { getSkills } from '@/lib/queries';
import { createClient } from '@/lib/supabase/server';
import { updateProject } from '../../actions';
import type { Project } from '@/lib/types/database';

async function getProjectById(id: string): Promise<Project | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('projects')
      .select('*, technologies:project_technologies(skill_id)')
      .eq('id', id)
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const [project, allSkills] = await Promise.all([getProjectById(params.id), getSkills()]);
  if (!project) notFound();

  const selectedSkillIds = ((project as any).technologies ?? []).map(
    (t: { skill_id: string }) => t.skill_id
  );

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Edit project</h1>
      <div className="mt-6">
        <ProjectForm
          project={project}
          allSkills={allSkills}
          selectedSkillIds={selectedSkillIds}
          action={updateProject.bind(null, project.id)}
        />
      </div>
    </div>
  );
}
